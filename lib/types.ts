type Tag = string

export type FrontMatter = {
  title: string
  excerpt: string
  date: string
  author: string
  tags: Tag[]
  locale: 'pt-BR' | 'en'
}
