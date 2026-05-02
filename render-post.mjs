import { readFileSync, writeFileSync } from 'node:fs';
import { marked } from 'marked';
import matter from 'gray-matter';

const input = process.argv[2];
const output = process.argv[3] ?? input.replace(/\.md$/, '.html');

const raw = readFileSync(input, 'utf8');
const { data, content } = matter(raw);
const body = marked.parse(content)
  .replace(/(src|href)="\/(images|assets)\//g, '$1="../$2/');

const tagsHtml = (data.tags ?? '')
  .split(/\s+/)
  .filter(Boolean)
  .map(t => `<span class="tag">#${t}</span>`)
  .join(' ');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${data.title ?? ''}</title>
<meta name="description" content="${(data.description ?? '').replace(/"/g, '&quot;')}">
<style>
  :root { color-scheme: light dark; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    max-width: 760px;
    margin: 2.5rem auto;
    padding: 0 1.25rem;
    line-height: 1.7;
    color: #222;
    background: #fff;
  }
  @media (prefers-color-scheme: dark) {
    body { color: #e6e6e6; background: #161616; }
    a { color: #80b3ff; }
    code { background: #2a2a2a; }
    pre { background: #1e1e1e; }
    blockquote { border-color: #444; color: #bbb; }
    hr { border-color: #333; }
    .meta { color: #999; }
    .tag { background: #2a2a2a; color: #bbb; }
  }
  h1 { font-size: 2rem; line-height: 1.25; margin-bottom: 0.25rem; }
  h2 { margin-top: 2.5rem; }
  h3 { margin-top: 1.75rem; }
  .meta { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
  .tag {
    display: inline-block; padding: 0.1rem 0.5rem; border-radius: 4px;
    background: #eee; color: #555; font-size: 0.8rem; margin-right: 0.25rem;
  }
  p { margin: 1rem 0; }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    background: #f3f3f3; padding: 0.1rem 0.35rem; border-radius: 3px;
    font-size: 0.92em;
  }
  pre {
    background: #f6f8fa; padding: 1rem; border-radius: 6px;
    overflow-x: auto; line-height: 1.45;
  }
  pre code { background: transparent; padding: 0; font-size: 0.88em; }
  blockquote {
    border-left: 4px solid #ccc; margin: 1.25rem 0;
    padding: 0.25rem 1rem; color: #555;
  }
  hr { border: none; border-top: 1px solid #ddd; margin: 2.5rem 0; }
  ul, ol { padding-left: 1.5rem; }
  li { margin: 0.35rem 0; }
  a { color: #0366d6; }
  img { max-width: 100%; height: auto; display: block; margin: 1rem auto; }
  figure { margin: 1.5rem 0; text-align: center; }
  figcaption { font-size: 0.9rem; color: #666; font-style: italic; margin-top: 0.5rem; }
</style>
</head>
<body>
<article>
  <header>
    <h1>${data.title ?? ''}</h1>
    <div class="meta">
      ${data.date ? new Date(data.date).toISOString().slice(0, 10) : ''}
      ${tagsHtml ? ' &middot; ' + tagsHtml : ''}
    </div>
  </header>
  ${body}
</article>
</body>
</html>
`;

writeFileSync(output, html);
console.log(`Wrote ${output}`);
