Blog - Dat Le
===

Personal blog at <https://lethanhdat.com>, built with [Astro](https://astro.build) and the [Astro Pure](https://github.com/cworld1/astro-theme-pure) theme, in English (default) and Vietnamese.

1. Prerequisites
   * Node.js 22.12 or newer

2. How to run
   ```
   > npm install
   > npm run dev
   ```
   The site is at <http://localhost:4321>. Search (Pagefind) only works in a production build: `npm run build && npm run preview`.

3. Write a post
   * Create the same file name in both languages: `src/content/blog/en/<slug>.md` and `src/content/blog/vi/<slug>.md`. The shared slug links the translations (language switcher and `hreflang`), and the URLs are `/blog/<slug>/` and `/vi/blog/<slug>/`.
   * Front matter: `title`, `description`, `publishDate`, `tags`, optional `ogImage` (social card, a path under `public/`), `draft` and `pin`.
   * Put images in `public/images/` and refer to them with absolute paths (`/images/...`). Markdown images can be zoomed in; for a raw `<img>` add `class="zoomable"`, and `thumb`, `size-50` or `size-75` to resize it.

4. Interface texts and languages
   * Texts are in `src/i18n/ui.ts`, languages in `src/i18n/config.ts`.
   * Each language has its own route folder: the default language in `src/pages`, the others in `src/pages/<code>`.

5. Games in `public/toys` are static pages with their own tests: `npm test`.

6. Deploy to GitHub Pages
   * Push to the `gh-pages` branch: `.github/workflows/deploy.yml` tests, builds and publishes the site.
   * One-time setting: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
   * The URLs of the old Jekyll site redirect to the new posts (`src/i18n/redirects.ts`), and `/feed.xml` still serves the English feed.
