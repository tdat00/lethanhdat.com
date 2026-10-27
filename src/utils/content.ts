import { getCollection, type CollectionEntry } from 'astro:content'

import { getLocaleInfo, isLocale, localizedPath, locales, type Locale } from '@/i18n/config'

export type Post = CollectionEntry<'blog'>

const isProd = import.meta.env.PROD

// Entries live in `src/content/blog/<locale>/<slug>.md`, so their id is `<locale>/<slug>`.
export const postLocale = (post: Post): Locale => {
  const locale = post.id.split('/')[0]
  if (!isLocale(locale)) throw new Error(`Blog post "${post.id}" is not inside a locale folder`)
  return locale
}

export const postSlug = (post: Post) => post.id.slice(post.id.indexOf('/') + 1)

/** Pinned posts first, then the newest. */
export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (Boolean(a.data.pin) !== Boolean(b.data.pin)) return Number(b.data.pin) - Number(a.data.pin)
    return b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  })
}

/** Posts of one locale (drafts are only included by the dev server). */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    (post) => post.id.startsWith(`${locale}/`) && (isProd ? !post.data.draft : true)
  )
  return sortPosts(posts)
}

/** The same post in every locale it is available in (keyed by locale). */
export async function getTranslations(post: Post): Promise<Partial<Record<Locale, Post>>> {
  const slug = postSlug(post)
  const entries = await Promise.all(
    locales.map(async ({ code }) => {
      const translated = (await getPosts(code)).find((candidate) => postSlug(candidate) === slug)
      return [code, translated] as const
    })
  )
  return Object.fromEntries(entries.filter(([, translated]) => translated))
}

export const postUrl = (locale: Locale, slug: string) => localizedPath(locale, `/blog/${slug}`)
export const tagUrl = (locale: Locale, tag: string) => localizedPath(locale, `/tags/${tag}`)

export function getTagCounts(posts: Post[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

export function groupByYear(posts: Post[]): [number, Post[]][] {
  const years = new Map<number, Post[]>()
  for (const post of posts) {
    const year = post.data.publishDate.getFullYear()
    years.set(year, [...(years.get(year) ?? []), post])
  }
  return [...years].sort((a, b) => b[0] - a[0])
}

export function formatDate(date: Date, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString(getLocaleInfo(locale).hreflang, {
    day: 'numeric',
    // Vietnamese abbreviates months as "thg 5", which reads poorly.
    month: locale === 'vi' ? 'long' : 'short',
    year: 'numeric',
    ...options
  })
}

const WORDS_PER_MINUTE = 200

/** `words` is provided by the theme's reading-time remark plugin. */
export const readingMinutes = (words: unknown) =>
  Math.max(1, Math.ceil((typeof words === 'number' ? words : 0) / WORDS_PER_MINUTE))
