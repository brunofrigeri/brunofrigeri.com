type Tag = string

export type FrontMatter = {
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
  tags?: Tag[]
  locale: 'pt-BR' | 'en'
}

export type ReadTimeResults = {
  text: string
  time: number
  words: number
  minutes: number
}

export type Post = {
  frontMatter: FrontMatter
  content: string
  readingTime: ReadTimeResults
  featuredImage?: string
  views?: number
}

export type File = {
  fileName: string
  locale: string
}
