import type { Locale } from '@/i18n/config'

export type ProjectLinkType = 'github' | 'site' | 'doc'

export interface Project {
  name: string
  description: Record<Locale, string>
  links: {
    type: ProjectLinkType
    href: string | Record<Locale, string>
    /** Favicon under `public/`. Defaults to GitHub's for `github` links; other links show none. */
    favicon?: string
  }[]
  /** Image under `public/`, faded into the card background. */
  image?: string | Record<Locale, string>
}

export interface ProjectGroup {
  id: string
  title: Record<Locale, string>
  projects: Project[]
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 'programs',
    title: { en: 'Programs', vi: 'Dự án' },
    projects: [
      {
        name: 'Pentomino',
        description: {
          en: 'Generate your own Pentomino tiling puzzles, play them in the browser or print them on A4.',
          vi: 'Tự tạo trò chơi xếp hình Pentomino, chơi ngay trên trình duyệt hoặc in ra giấy A4.'
        },
        image: {
          en: '/images/pentomino-generator-en.gif',
          vi: '/images/pentomino-generator.gif'
        },
        links: [
          { type: 'github', href: 'https://github.com/tdat00/pentomino' },
          {
            type: 'site',
            href: 'https://tdat00.github.io/pentomino/',
            favicon: '/images/favicons/pentomino.svg'
          }
        ]
      },
      {
        name: 'Sudoku',
        description: {
          en: 'Generate 15 variants of Sudoku puzzles with many difficulty levels, play online or print them to A4.',
          vi: 'Tạo 15 biến thể Sudoku với nhiều mức độ khó, chơi trực tuyến hoặc in ra giấy A4.'
        },
        image: {
          en: '/images/sudoku-generator-en.gif',
          vi: '/images/sudoku-generator.gif'
        },
        links: [
          { type: 'github', href: 'https://github.com/tdat00/sudoku' },
          {
            type: 'site',
            href: 'https://tdat00.github.io/sudoku/',
            favicon: '/images/favicons/sudoku.svg'
          }
        ]
      },
      {
        name: 'Regex Tester',
        description: {
          en: 'Test regular expressions online using many engines such as .NET, Python, Java and Node.js.',
          vi: 'Kiểm thử biểu thức chính quy trực tuyến với nhiều engine như .NET, Python, Java và Node.js.'
        },
        links: [
          { type: 'github', href: 'https://github.com/RegExTester' },
          {
            type: 'site',
            href: 'https://regextester.github.io',
            favicon: '/images/favicons/regextester.png'
          }
        ]
      },
      {
        name: 'SDK for .NET',
        description: {
          en: 'A collection of reusable libraries for .NET Core.',
          vi: 'Bộ thư viện dùng lại được cho .NET Core.'
        },
        links: [{ type: 'github', href: 'https://github.com/LeeVox/sdk' }]
      }
    ]
  },
  {
    id: 'toys',
    title: { en: 'Funny toy projects', vi: 'Dự án đồ chơi vui' },
    projects: [
      {
        name: 'Captain Tsubasa II Super Striker',
        description: {
          en: 'A password generator for the classic Famicom/NES game Captain Tsubasa Vol. II.',
          vi: 'Trình tạo mật khẩu cho trò chơi Famicom/NES kinh điển Captain Tsubasa Vol. II.'
        },
        image: '/images/captain-tsubasa.jpg',
        links: [
          { type: 'site', href: 'https://lethanhdat.com/toys/captain-tsubasa-ii-super-striker.html' }
        ]
      },
      {
        name: 'Word Search Puzzle',
        description: {
          en: 'Create your own word search puzzle, mark words as you find them and print on A4.',
          vi: 'Tự tạo trò chơi tìm chữ, đánh dấu từ trực tiếp và in ra giấy A4.'
        },
        image: '/images/word-search-puzzle.png',
        links: [
          {
            type: 'site',
            href: {
              en: 'https://lethanhdat.com/toys/word-search-puzzle.html?lang=en',
              vi: 'https://lethanhdat.com/toys/word-search-puzzle.html'
            }
          }
        ]
      },
      {
        name: 'Animal Search Puzzle',
        description: {
          en: 'Find sequences of animals in a picture grid, great for children who cannot read yet.',
          vi: 'Tìm chuỗi con vật trong lưới hình ảnh, phù hợp cho trẻ chưa biết chữ.'
        },
        image: '/images/animal-search-puzzle-color.png',
        links: [{ type: 'site', href: 'https://lethanhdat.com/toys/animal-search-puzzle.html' }]
      },
      {
        name: 'Find Number Puzzle',
        description: {
          en: 'Test your sharp eyes with a shuffled grid of numbers from a range you choose.',
          vi: 'Thử tài quan sát với lưới số xáo trộn trong khoảng bạn chọn.'
        },
        links: [{ type: 'site', href: 'https://lethanhdat.com/toys/find-number-puzzle.html' }]
      }
    ]
  }
]
