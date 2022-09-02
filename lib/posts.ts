import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import en from 'date-fns/locale/en-US'

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
  stacks: Array<string>
  views?: number
}

const postDirectory = path.join(process.cwd(), 'posts')

const formatData = (data, content, locale) => {
  const reading_time = readingTime(content)

  const formattedDate = format(new Date(data.date), 'MMMM dd, yyyy', {
    locale: locale === 'pt-BR' ? ptBR : en,
  })

  return {
    ...data,
    author: data.author,
    content,
    title: data.title,
    stacks: data.stacks,
    excerpt: data.excerpt,
    date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    featured_image: data.featuredImage || '',
    reading_time,
  }
}

export const getAllPosts = (locale: string): Array<Post> => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = fs.readdirSync(postDirectory)

    if (fileNames.length <= 0) return []

    const lowerCaseLocale = locale.toLocaleLowerCase().replace('-', '')

    const filteredFilenamesByLocale = fileNames.filter((filename) => {
      const splitFilename = filename.replace('.mdx', '').split('-')

      return splitFilename[splitFilename.length - 1] === lowerCaseLocale
    })

    const filteredData = filteredFilenamesByLocale.map((filename) => {
      const slug = filename.replace('.mdx', '')

      const fullPath = path.join(postDirectory, filename)

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const front_matter = formatData(data, content, locale)

      return {
        slug,
        ...front_matter,
      }
    })

    return filteredData.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1
      } else {
        return -1
      }
    })
  } else return []
}

export const getLatestsPosts = (locale: string): Array<Post> => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = fs.readdirSync(postDirectory)
    const lowerCaseLocale = locale.toLocaleLowerCase().replace('-', '')

    const filteredFilenamesByLocale = fileNames.filter((filename) => {
      const splitFilename = filename.replace('.mdx', '').split('-')

      return splitFilename[splitFilename.length - 1] === lowerCaseLocale
    })

    const filteredData = filteredFilenamesByLocale
      .map((filename) => {
        const slug = filename.replace('.mdx', '')

        const fullPath = path.join(postDirectory, filename)

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const front_matter = formatData(data, content, locale)

        return {
          slug,
          ...front_matter,
        }
      })
      .filter((_, index) => index < 3)

    return filteredData.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1
      } else {
        return -1
      }
    })
  } else return []
}

export const getAllPostSlugs = () => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = fs.readdirSync(postDirectory)

    return fileNames.map((filename) => {
      return {
        params: {
          slug: filename.replace('.mdx', ''),
        },
      }
    })
  } else {
    return []
  }
}

export const getPostBySlug = async (slug: string, locale: string) => {
  const fullPath = path.join(postDirectory, `${slug}.mdx`)
  const postContent = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(postContent)

  const front_matter = formatData(data, content, locale)

  return {
    slug,
    ...front_matter,
  }
}
