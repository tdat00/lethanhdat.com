var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;
var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var buildDrafts = argv && (argv.draft !== undefined || argv.drafts !== undefined );
var isWindows = process.platform === 'win32';

var run = function (command, cb) {
  var child = isWindows
    ? spawn('cmd', ['/c', command], { stdio: 'inherit' })
    : spawn('sh', ['-c', command], { stdio: 'inherit' });

  child.on('error', function (err) {
    cb && cb(err);
  });
  child.on('close', function (code) {
    if (code !== 0) {
      cb && cb(new Error("Command '" + command + "' exited with code " + code));
    } else {
      cb && cb();
    }
  });
};

var hasCommand = function (cmd) {
  var probe = isWindows
    ? spawnSync('cmd', ['/c', 'where ' + cmd])
    : spawnSync('sh', ['-c', 'command -v ' + cmd]);
  return probe.status === 0;
};

var requireRuby = function (cb) {
  if (!hasCommand('ruby')) {
    return cb(new Error(
      "Ruby is not installed or not on PATH. Install Ruby+Devkit (https://rubyinstaller.org/ on Windows, or `brew install ruby` on macOS) and reopen the shell, then re-run this task."
    ));
  }
  if (!hasCommand('gem')) {
    return cb(new Error("'gem' was not found on PATH even though Ruby seems present. Reinstall RubyGems."));
  }
  cb();
};

var getAllDates = function () {
  var dates = {},
  fnProcess = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      var rgxMatchFilename = /\d{4}-\d{2}-\d{2}-.+\.md$/ig;
      var rgxMatchDates = /---[^]*date:\s*\[?\s*(\d{4}\-\d{2}\-\d{2}).*\]?\s*\r?\n[^]*---/igm;
  
      if (!file.match(rgxMatchFilename)) {
        return;
      }
  
      var match = rgxMatchDates.exec(readFile(dir + '/' + file));
      if (match && match[1]) {
        var arr = match[1].split('-');
        dates[arr.slice(0,1).join('/')] = true;
        dates[arr.slice(0,2).join('/')] = true;
        dates[arr.slice(0,3).join('/')] = true;
      }
    });
  };

  fnProcess('./_posts');
  if (buildDrafts) {
    fnProcess('./_drafts');
  }
  return dates;
};

var getAllTags = function () {
  var tags = {},
    fnProcess = (dir) => {
      fs.readdirSync(dir).forEach(file => {
        var rgxMatchFilename = /\d{4}-\d{2}-\d{2}-.+\.md$/ig;
        var rgxMatchTags = /---[^]*tags:\s*\[?(.*?)\]?\s*\r?\n[^]*---/igm;
    
        if (!file.match(rgxMatchFilename)) {
          return;
        }
    
        var match = rgxMatchTags.exec(readFile(dir + '/' + file));
        if (match && match[1]) {
          match[1].split(/[,\s]+/ig).forEach(tag => {
            if (tag.trim()) {
              tags[friendlyUrl(tag.trim())] = tag.trim();
            }
          });
        }
      });
    };
  fnProcess('./_posts');
  if (buildDrafts) {
    fnProcess('./_drafts');
  }
  return tags;
};

var getAllCategories = function () {
  var categories = {},
    fnProcess = (dir) => {
      fs.readdirSync(dir).forEach(file => {
        var rgxMatchFilename = /\d{4}-\d{2}-\d{2}-.+\.md$/ig;
        var rgxMatchCategories = /---[^]*categories:\s*\[?(.*?)\]?\s*\r?\n[^]*---/igm;
    
        if (!file.match(rgxMatchFilename)) {
          return;
        }
    
        var match = rgxMatchCategories.exec(readFile(dir + '/' + file));
        if (match && match[1]) {
          var cats = match[1].split(/[,\s]+/ig);
          for (var i = 1; i <= cats.length; i++) {
            categories[cats.slice(0, i).join('/')] = cats.slice(0, i).join(' ');
          }
        }
      });
    };
  fnProcess('./_posts');
  if (buildDrafts) {
    fnProcess('./_drafts');
  }
  return categories;
};

var friendlyUrl = function (url) {
  return url.replace(/#/ig, 'sharp')
    .replace(/\./ig, 'dot');
};

var readFile = function (relativePath) {
  return fs.readFileSync(path.resolve(relativePath), 'utf8');
}

var writeFile = function (relativePath, content) {
  var folder = path.dirname(relativePath);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fs.writeFileSync(path.resolve(relativePath), content);
};

var serveTask = function (command) {
  return function (cb) {
    requireRuby(function (err) {
      if (err) return cb(err);
      if (!hasCommand('bundle')) {
        return cb(new Error("Bundler is not installed. Run `gulp install` (or `gem install bundler && bundle install`) first."));
      }
      run(command, cb);
    });
  };
};

gulp.task('serve', serveTask('bundle exec jekyll serve --watch --incremental --drafts'));
gulp.task('server', gulp.series('serve'));

gulp.task('serve-prod', serveTask('bundle exec jekyll serve'));
gulp.task('server-prod', gulp.series('serve-prod'));

gulp.task('build-dates', function (cb) {
  var dates = getAllDates();
  for (var date in dates) {
    writeFile('./date/' + date + '.md',
      `---
layout: date
title: Posts in {date}
date: {date}
permalink: /{date}/
---`.replace(/\{date\}/ig, date)
    );
  }
  cb && cb();
});

gulp.task('build-tags', function (cb) {
  var content = '',
    tags = getAllTags();
  for (var tagUrl in tags) {
    content += tagUrl + ': ' + tags[tagUrl] + '\n';
    writeFile('./tag/' + tagUrl + '.md',
      `---
layout: tag
title: Posts with tag '{tag}'
tag: {tag}
permalink: /tag/{tag-url}/
---`.replace(/\{tag\}/ig, tags[tagUrl]).replace(/\{tag-url\}/ig, tagUrl)
    );
  }
  writeFile('./_data/tags.yml', content);
  cb && cb();
});

gulp.task('build-categories', function (cb) {
  var content = '',
    categories = getAllCategories();
  for (var categoryUrl in categories) {
    content += categoryUrl + ': ' + categoryUrl + '\n';
    writeFile('./category/' + categoryUrl + '.md',
      `---
layout: category
title: Posts in category '{category-url}'
category: {category}
permalink: /{category-url}/
---`.replace(/\{category\}/ig, categories[categoryUrl]).replace(/\{category-url\}/ig, categoryUrl)
    );
  }
  writeFile('./_data/categories.yml', content);
  cb && cb();
});

gulp.task('clean-dates', function (cb) {
  del.sync('./date');
  cb && cb();
});

gulp.task('clean-tags', function (cb) {
  del.sync('./tag');
  cb && cb();
});

gulp.task('clean-categories', function (cb) {
  del.sync('./category');
  cb && cb();
});

gulp.task('clean-sites', function (cb) {
  del.sync('./_site');
  cb && cb();
});

gulp.task('clean', gulp.series('clean-sites', 'clean-dates', 'clean-tags', 'clean-categories'));

gulp.task('build', gulp.series('clean', 'build-dates', 'build-tags', 'build-categories'));

gulp.task('install-bundler', function (cb) {
  requireRuby(function (err) {
    if (err) return cb(err);
    if (hasCommand('bundle')) {
      gutil.log('Bundler already installed; skipping `gem install bundler`.');
      return cb();
    }
    run('gem install bundler', cb);
  });
});

gulp.task('install', gulp.series('install-bundler', function (cb) {
  run('bundle install', cb);
}));
