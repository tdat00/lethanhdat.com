import type { Locale } from './config'

const en = {
  description: 'Just a simple blog.',
  tagline: 'a boy who code',

  menuBlog: 'Blog',
  menuTags: 'Tags',
  menuArchives: 'Archives',
  menuToggle: 'Menu',
  searchLabel: 'Search',
  themeToggle: 'Toggle theme',
  themeSet: (theme: 'system' | 'dark' | 'light') => `Set theme to ${theme}`,
  languageLabel: 'Language',

  back: 'Back',
  backToHome: 'Back to home',
  backToTop: 'Back to top',

  github: 'GitHub',
  email: 'Email',
  recentPosts: 'Recent posts',
  morePosts: 'More posts',
  links: 'Links',

  blog: 'Blog',
  blogDescription: 'Posts from my blog',
  pageSummary: (page: number, shown: number, total: number) =>
    `Page ${page} - Showing ${shown} of ${total} posts`,
  viewByYear: 'View all posts by years →',
  previousPosts: '← Newer posts',
  nextPosts: 'Older posts →',
  noPosts: 'No posts yet.',

  tags: 'Tags',
  tagsDescription: "A list of all the topics I've written about in my posts",
  viewAll: 'View all →',
  noTags: 'No tags yet.',
  tagTitle: (tag: string) => `Tag: ${tag}`,
  tagDescription: (tag: string) => `View all posts with the tag - ${tag}`,
  viewTag: (tag: string) => `View more posts with the tag ${tag}`,

  archives: 'Archives',
  archivesDescription: 'A list of all my posts, grouped by year',
  postCount: (count: number) => `${count} post${count === 1 ? '' : 's'}`,

  searchTitle: 'Search',
  searchDescription: 'Search the posts of the whole blog',
  searchPrompt: 'Enter a search term or phrase to search the blog.',
  searchDisabledInDev: 'You are in Dev mode, the search is disabled.',

  readingTime: (minutes: number) => `${minutes} min read`,
  updated: 'Updated',
  toc: 'Table of contents',
  copied: 'Copied!',
  collapse: 'Collapse',
  showAll: 'Show all',

  notFound: 'Page not found',
  notFoundText: "Sorry, we couldn't find the page you were looking for.",

  footerCredits: 'Built with',
  footerTheme: 'theme'
}

const vi: typeof en = {
  description: 'Một blog đơn giản.',
  tagline: 'chàng trai viết code',

  menuBlog: 'Bài viết',
  menuTags: 'Thẻ',
  menuArchives: 'Lưu trữ',
  menuToggle: 'Menu',
  searchLabel: 'Tìm kiếm',
  themeToggle: 'Đổi giao diện',
  themeSet: (theme) =>
    `Đã chuyển giao diện: ${{ system: 'theo hệ thống', dark: 'tối', light: 'sáng' }[theme]}`,
  languageLabel: 'Ngôn ngữ',

  back: 'Quay lại',
  backToHome: 'Về trang chủ',
  backToTop: 'Lên đầu trang',

  github: 'GitHub',
  email: 'Email',
  recentPosts: 'Bài viết mới',
  morePosts: 'Xem thêm bài viết',
  links: 'Liên kết',

  blog: 'Bài viết',
  blogDescription: 'Các bài viết trên blog của tôi',
  pageSummary: (page, shown, total) => `Trang ${page} - Hiển thị ${shown}/${total} bài viết`,
  viewByYear: 'Xem tất cả bài viết theo năm →',
  previousPosts: '← Bài viết mới hơn',
  nextPosts: 'Bài viết cũ hơn →',
  noPosts: 'Chưa có bài viết nào.',

  tags: 'Thẻ',
  tagsDescription: 'Danh sách các chủ đề tôi đã viết trong blog',
  viewAll: 'Xem tất cả →',
  noTags: 'Chưa có thẻ nào.',
  tagTitle: (tag) => `Thẻ: ${tag}`,
  tagDescription: (tag) => `Tất cả bài viết có thẻ ${tag}`,
  viewTag: (tag) => `Xem thêm bài viết có thẻ ${tag}`,

  archives: 'Lưu trữ',
  archivesDescription: 'Danh sách tất cả bài viết, nhóm theo năm',
  postCount: (count) => `${count} bài viết`,

  searchTitle: 'Tìm kiếm',
  searchDescription: 'Tìm kiếm trong tất cả bài viết của blog',
  searchPrompt: 'Nhập từ khóa hoặc cụm từ để tìm kiếm trong blog.',
  searchDisabledInDev: 'Bạn đang ở chế độ Dev, tính năng tìm kiếm bị tắt.',

  readingTime: (minutes) => `${minutes} phút đọc`,
  updated: 'Cập nhật',
  toc: 'Mục lục',
  copied: 'Đã chép!',
  collapse: 'Thu gọn',
  showAll: 'Xem tất cả',

  notFound: 'Không tìm thấy trang',
  notFoundText: 'Rất tiếc, chúng tôi không tìm thấy trang bạn cần.',

  footerCredits: 'Xây dựng bằng',
  footerTheme: 'giao diện'
}

export const ui: Record<Locale, typeof en> = { en, vi }

export const useTranslations = (locale: Locale) => ui[locale]
