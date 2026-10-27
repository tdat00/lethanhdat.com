// Same behavior as the theme's own `setTheme`: cycle system -> dark -> light, saved in localStorage.
// Kept here because importing `astro-pure/utils` from client code makes Vite pre-bundle it,
// and that bundle cannot resolve the theme's `virtual:config` module.

type Theme = 'system' | 'dark' | 'light'

const themes: Theme[] = ['system', 'dark', 'light']

function listenThemeChange() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    applyTheme(e.matches ? 'dark' : 'light')
  })
}

function applyTheme(theme: Theme) {
  let target = theme
  if (theme === 'system') {
    target = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    listenThemeChange()
  }
  document.documentElement.classList.toggle('dark', target === 'dark')
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', target === 'dark' ? '#0B0B10' : '#FCFCFD')
}

/** Switch to the next theme, remember it and return it. */
export function cycleTheme(): Theme {
  const current = (localStorage.getItem('theme') as Theme | null) ?? 'system'
  const next = themes[(themes.indexOf(current) + 1) % themes.length]
  localStorage.setItem('theme', next)
  applyTheme(next)
  return next
}

/** Shown by the theme's `ThemeProvider`. */
export function showToast(message: string) {
  document.dispatchEvent(new CustomEvent('toast', { detail: { message } }))
}
