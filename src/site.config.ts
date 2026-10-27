import type { Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

// Only the language-neutral settings live here. Texts shown in the UI are in `src/i18n/ui.ts`.
export const theme: ThemeUserConfig = {
  title: 'Blog - Dat Le',
  author: 'Dat Le',
  description: 'Just a simple blog.',
  favicon: '/favicon.ico',
  socialCard: '/assets/images/cover.jpg',
  locale: {
    lang: 'en',
    attrs: 'en_US',
    dateLocale: 'en-US',
    dateOptions: { day: 'numeric', month: 'short', year: 'numeric' }
  },
  logo: {
    src: '/assets/images/avatar.png',
    alt: 'Dat Le'
  },

  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  head: [],
  customCss: [],

  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Tags', link: '/tags' },
      { title: 'Archives', link: '/archives' }
    ]
  },

  footer: {
    year: `© 2017 - ${new Date().getFullYear()}`,
    links: [],
    credits: true,
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/tdat00' },
      { icon: 'rss', label: 'RSS', href: '/rss.xml' }
    ]
  },

  content: {
    externalLinks: {
      content: ' ↗',
      properties: { style: 'user-select:none' }
    },
    blogPageSize: 8,
    share: []
  }
}

export const integ: IntegrationUserConfig = {
  links: { logbook: [], applyTip: [], cacheAvatar: false },
  pagefind: true,
  // Required by the theme's config schema; the quote component is not used on this site.
  quote: { server: '', target: '' },
  typography: {
    class: 'prose text-base',
    blockquoteStyle: 'italic',
    inlineCodeBlockStyle: 'modern'
  },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: { className: 'zoomable' }
  },
  waline: { enable: false }
}

// Contact details used by the home page and the footer.
export const profile = {
  name: 'Dat Le',
  email: 'lethanhdat@gmail.com',
  github: 'https://github.com/tdat00',
  links: [
    { title: 'SDK for C#', href: 'https://github.com/LeeVox/sdk' },
    { title: 'Regex Tester', href: 'https://regextester.github.io' },
    { title: 'LeeVox', href: 'https://leevox.com' }
  ]
}

const config = { ...theme, integ } as Config
export default config
