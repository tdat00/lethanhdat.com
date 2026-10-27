import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import AstroPureIntegration from 'astro-pure'
import { defineConfig, fontProviders } from 'astro/config'

import { defaultLocale, locales } from './src/i18n/config.ts'
import { legacyRedirects } from './src/i18n/redirects.ts'
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
import {
  addCollapse,
  addCopyButton,
  addLanguage,
  addTitle,
  updateStyle
} from './src/plugins/shiki-custom-transformers.ts'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape
} from './src/plugins/shiki-official/transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://lethanhdat.com',
  // Every URL ends with a slash: GitHub Pages serves `dir/index.html` without an extra redirect.
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  prefetch: { defaultStrategy: 'viewport' },
  redirects: legacyRedirects,

  image: {
    responsiveStyles: true,
    service: { entrypoint: 'astro/assets/services/sharp' },
    remotePatterns: [{ protocol: 'https' }]
  },
  // Inter has Vietnamese glyphs, which the theme's default font lacks.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      styles: ['normal'],
      weights: [400, 500, 600, 700],
      subsets: ['latin', 'latin-ext', 'vietnamese'],
      fallbacks: ['system-ui', 'sans-serif']
    }
  ],

  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      transformers: [
        // Two copies of @shikijs/types (one under node_modules and another nested under
        // @astrojs/markdown-remark → shiki) make these transformer types incompatible.
        // @ts-ignore
        transformerNotationDiff(),
        // @ts-ignore
        transformerNotationHighlight(),
        // @ts-ignore
        transformerRemoveNotationEscape(),
        // @ts-ignore
        updateStyle(),
        // @ts-ignore
        addTitle(),
        // @ts-ignore
        addLanguage(),
        // @ts-ignore
        addCopyButton(2000),
        // @ts-ignore
        addCollapse(15)
      ]
    }
  },

  integrations: [
    // Registered here (rather than by astro-pure) to emit hreflang alternates for each locale.
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map(({ code, hreflang }) => [code, hreflang]))
      }
    }),
    AstroPureIntegration(config)
  ],

  experimental: {
    contentIntellisense: true
  }
})
