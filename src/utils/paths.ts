import type { PaginateFunction } from 'astro'

import type { Locale } from '@/i18n/config'
import config from '@/site-config'
import { getPosts, getTagCounts, postSlug } from '@/utils/content'

// Helpers shared by the per-locale routes, which can only define `getStaticPaths` themselves.

export async function blogListPaths(paginate: PaginateFunction, locale: Locale) {
  const posts = await getPosts(locale)
  const tags = getTagCounts(posts).map(([tag]) => tag)
  return paginate(posts, {
    pageSize: config.content.blogPageSize,
    props: { tags, total: posts.length }
  })
}

export async function postPaths(locale: Locale) {
  const posts = await getPosts(locale)
  return posts.map((post) => ({ params: { slug: postSlug(post) }, props: { post, posts } }))
}

export async function tagPaths(paginate: PaginateFunction, locale: Locale) {
  const posts = await getPosts(locale)
  return getTagCounts(posts).flatMap(([tag]) =>
    paginate(
      posts.filter((post) => post.data.tags.includes(tag)),
      { pageSize: config.content.blogPageSize, params: { tag }, props: { tag } }
    )
  )
}
