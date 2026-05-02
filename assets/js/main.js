(function () {
  'use strict';

  // -- Theme toggle ----------------------------------------------------------
  var root = document.documentElement;
  var toggleBtn = document.querySelector('.theme-toggle');

  function setTheme(next) {
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    var color = next === 'dark' ? '#0b0d10' : '#fafafa';
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = color;
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // -- Mobile nav ------------------------------------------------------------
  var nav = document.querySelector('.site-nav');
  var navToggle = document.querySelector('.site-nav__toggle');
  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) nav.classList.remove('is-open');
    });
  }

  // -- Annotate code blocks with language label ------------------------------
  var blocks = document.querySelectorAll('div.highlight, figure.highlight');
  blocks.forEach(function (block) {
    var classes = block.className.split(/\s+/);
    var lang = '';
    classes.forEach(function (c) {
      if (c.indexOf('language-') === 0) lang = c.replace('language-', '');
    });
    if (!lang) {
      var inner = block.querySelector('code[class*="language-"]');
      if (inner) {
        inner.className.split(/\s+/).forEach(function (c) {
          if (c.indexOf('language-') === 0) lang = c.replace('language-', '');
        });
      }
    }
    if (lang) block.setAttribute('data-lang', lang);
  });
})();
