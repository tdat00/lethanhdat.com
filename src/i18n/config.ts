export const locales = [
  { code: 'en', label: 'English', hreflang: 'en-US', ogLocale: 'en_US' },
  { code: 'vi', label: 'Tiếng Việt', hreflang: 'vi-VN', ogLocale: 'vi_VN' }
] as const

export type Locale = (typeof locales)[number]['code']

export const defaultLocale: Locale = 'en'

export const isLocale = (value: string | undefined): value is Locale =>
  locales.some(({ code }) => code === value)

export const getLocaleInfo = (locale: Locale) => locales.find(({ code }) => code === locale)!

/** Locale of a URL path: `/vi/blog/` is Vietnamese, everything else is the default locale. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/')[1]
  return first !== defaultLocale && isLocale(first) ? first : defaultLocale
}

/** `/vi/blog/x/` -> `/blog/x/` (the default locale has no prefix). */
export function stripLocale(pathname: string): string {
  const first = pathname.split('/')[1]
  if (first === defaultLocale || !isLocale(first)) return pathname
  return pathname.slice(first.length + 1) || '/'
}

/**
 * Prefix a site path with the locale (the default locale has no prefix).
 * Paths without a file extension always end with a slash, as required by `trailingSlash: 'always'`.
 */
export function localizedPath(locale: Locale, path: string): string {
  const [pathname, suffix = ''] = path.split(/(?=[?#])/)
  let normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (!/\.[a-z0-9]+$/i.test(normalized) && !normalized.endsWith('/')) normalized += '/'
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${prefix}${normalized}${suffix}`
}
