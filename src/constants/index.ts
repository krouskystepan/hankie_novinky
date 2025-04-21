import { TPost } from './types'

export const HERO_GIFS = [
  {
    path: '/spongebob.gif',
    alt: 'SpongeBob',
  },
  {
    path: '/bird.gif',
    alt: 'Angry Bird',
  },
  {
    path: '/patrick.gif',
    alt: 'Patrick',
  },
]

export const TAGS = [
  'zabava',
  'novinky',
  'zajimavosti',
  'tipy',
  'outfity',
  'jine',
] as const

export const POSTS = [
  {
    title: 'Jak se jmenuje ten kluk? jmenuje ten kluk?',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tag: 'novinky',
    images: [
      'https://r2.fivemanage.com/image/1L8hY7ClJPwN.webp',
      'https://r2.fivemanage.com/image/1L8hY7ClJPwN.webp',
      'https://r2.fivemanage.com/image/1L8hY7ClJPwN.webp',
    ],
  },
] as TPost[]
