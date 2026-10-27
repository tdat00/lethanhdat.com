// Regenerates date/tag/category pages and _data/*.yml (GitHub Pages cannot run custom plugins).
// Usage: node build-pages.mjs [--drafts]
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const buildDrafts = process.argv.slice(2).some(arg => /^--drafts?$/.test(arg));

const friendlyUrl = url => url.replace(/#/g, 'sharp').replace(/\./g, 'dot');

const writeFile = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

const readPosts = () => {
  const dirs = buildDrafts ? ['./_posts', './_drafts'] : ['./_posts'];
  return dirs.flatMap(dir => readdirSync(dir)
    .filter(file => /\d{4}-\d{2}-\d{2}-.+\.md$/i.test(file))
    .map(file => readFileSync(`${dir}/${file}`, 'utf8')));
};

const getAllDates = posts => {
  const dates = {};
  for (const post of posts) {
    const match = /---[^]*date:\s*\[?\s*(\d{4}-\d{2}-\d{2}).*\]?\s*\r?\n[^]*---/im.exec(post);
    if (match?.[1]) {
      const parts = match[1].split('-');
      for (let i = 1; i <= 3; i++) {
        dates[parts.slice(0, i).join('/')] = true;
      }
    }
  }
  return dates;
};

const getAllTags = posts => {
  const tags = {};
  for (const post of posts) {
    const match = /---[^]*tags:\s*\[?(.*?)\]?\s*\r?\n[^]*---/im.exec(post);
    if (match?.[1]) {
      for (const tag of match[1].split(/[,\s]+/)) {
        if (tag.trim()) {
          tags[friendlyUrl(tag.trim())] = tag.trim();
        }
      }
    }
  }
  return tags;
};

const getAllCategories = posts => {
  const categories = {};
  for (const post of posts) {
    const match = /---[^]*categories:\s*\[?(.*?)\]?\s*\r?\n[^]*---/im.exec(post);
    if (match?.[1]) {
      const cats = match[1].split(/[,\s]+/);
      for (let i = 1; i <= cats.length; i++) {
        categories[cats.slice(0, i).join('/')] = cats.slice(0, i).join(' ');
      }
    }
  }
  return categories;
};

for (const dir of ['./date', './tag', './category']) {
  rmSync(dir, { recursive: true, force: true });
}

const posts = readPosts();

for (const date of Object.keys(getAllDates(posts))) {
  writeFile(`./date/${date}.md`,
    `---
layout: date
title: Posts in ${date}
date: ${date}
permalink: /${date}/
---
`);
}

const tags = getAllTags(posts);
let tagsYml = '';
for (const [tagUrl, tag] of Object.entries(tags)) {
  tagsYml += `${tagUrl}: ${tag}\n`;
  writeFile(`./tag/${tagUrl}.md`,
    `---
layout: tag
title: Posts with tag '${tag}'
tag: ${tag}
permalink: /tag/${tagUrl}/
---
`);
}
writeFile('./_data/tags.yml', tagsYml);

const categories = getAllCategories(posts);
let categoriesYml = '';
for (const [categoryUrl, category] of Object.entries(categories)) {
  categoriesYml += `${categoryUrl}: ${categoryUrl}\n`;
  writeFile(`./category/${categoryUrl}.md`,
    `---
layout: category
title: Posts in category '${categoryUrl}'
category: ${category}
permalink: /${categoryUrl}/
---
`);
}
writeFile('./_data/categories.yml', categoriesYml);
