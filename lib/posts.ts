import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

interface IReadTimeResults {
  text: string
  time: number
  words: number
  minutes: number
}

export type Post = {
  content: string
  title: string
  author: string
  excerpt: string
  date: string
  reading_time: IReadTimeResults
  slug: string
  featured_image?: string
}

const postDirectory = join(process.cwd(), 'posts')

const formatData = (data, content) => {
  const reading_time = readingTime(content)

  const formattedDate = new Date(data.date).toLocaleDateString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return {
    ...data,
    author: data.author,
    content,
    title: data.title,
    excerpt: data.excerpt,
    date: formattedDate,
    featured_image: data.featuredImage || '',
    reading_time,
  }
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postDirectory, realSlug)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const frontMatter = formatData(data, content)

  return { slug: realSlug, ...frontMatter }
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postDirectory)
  const posts = slugs.map((slug) => getPostBySlug(slug))

  return posts
}

export function getLatestsPosts() {
  return getAllPosts().filter((_, index) => index < 3)
}
