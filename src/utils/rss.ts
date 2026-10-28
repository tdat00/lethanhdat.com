import rss from '@astrojs/rss'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { render } from 'astro:content'

import type { Locale } from '@/i18n/config'
import { useTranslations } from '@/i18n/ui'
import config from '@/site-config'
import { getPosts, postSlug, postUrl } from '@/utils/content'

export async function createFeed(locale: Locale, site: URL) {
  const posts = await getPosts(locale)
  const container = await AstroContainer.create()

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post)
      const html = await container.renderToString(Content)
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishDate,
        link: postUrl(locale, postSlug(post)),
        categories: post.data.tags,
        // Readers need absolute URLs for images and links, and have no use for the theme's decorations.
        content: html
          .replace(/<a class="anchor"[^>]*>#<\/a>/g, '')
          .replace(/<span style="user-select:none"> ↗<\/span>/g, '')
          .replace(/(src|href)="\/(?!\/)/g, `$1="${site.origin}/`)
      }
    })
  )

  return rss({
    title: config.title,
    description: useTranslations(locale).description,
    site,
    customData: `<language>${locale}</language>`,
    items
  })
}
