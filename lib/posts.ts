import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import en from 'date-fns/locale/en-US'
import { Post } from './types'

const postDirectory = path.join(process.cwd(), 'posts')
const postPtBRDirectory = path.join(process.cwd(), 'posts', 'pt-BR')
const postEnDirectory = path.join(process.cwd(), 'posts', 'en')

export const formatData = (
  data: { [key: string]: any },
  content: string,
  locale: string,
  slug: string
): Post => {
  const readingData = readingTime(content)

  const isPtBrLocale = locale === 'pt-BR'

  const reading = isPtBrLocale
    ? {
        ...readingData,
        text: readingData.text.replace('read', 'de leitura'),
      }
    : readingData

  const formattedDate = format(new Date(data.date), 'MMMM dd, yyyy', {
    locale: isPtBrLocale ? ptBR : en,
  })

  return {
    ...data,
    content,
    frontMatter: {
      author: data.author,
      title: data?.title,
      slug,
      tags: data?.stacks ?? [],
      locale: data.locale,
      excerpt: data.excerpt,
      date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    },
    featuredImage: data.featuredImage || '',
    readingTime: reading,
  }
}

const postByLocaleDirectory: { 'pt-BR': string; en: string } = {
  'pt-BR': postPtBRDirectory,
  en: postEnDirectory,
}

const getPostLocaleDirectory = (locale: string): string => {
  const postLocaleDirectory = postByLocaleDirectory[locale]

  return postLocaleDirectory
}

const getFileNamesByLocale = (
  locale?: string
): string[] | { locale: string; fileName: string }[] => {
  if (locale) {
    if (fs.existsSync(postDirectory)) {
      const postLocaleDirectory = getPostLocaleDirectory(locale)

      const fileNames = fs.readdirSync(postLocaleDirectory)

      return fileNames
    }
  } else {
    if (fs.existsSync(postDirectory)) {
      const ptBRFileNames = fs.readdirSync(postPtBRDirectory)
      const enFileNames = fs.readdirSync(postEnDirectory)

      const ptBR = ptBRFileNames.map((fileName) => ({
        locale: 'pt-BR',
        fileName,
      }))

      const en = enFileNames.map((fileName) => ({
        locale: 'en',
        fileName,
      }))

      return [...ptBR, ...en]
    }
  }
}

export const getAllPosts = (locale: string): Post[] => {
  if (fs.existsSync(postDirectory)) {
    const postLocaleDirectory = getPostLocaleDirectory(locale)
    const fileNames = getFileNamesByLocale(locale)

    if (fileNames.length === 0) return []

    const filteredData = fileNames.map((filename) => {
      const slug = filename.replace('.mdx', '')

      const fullPath = path.join(postLocaleDirectory, filename)

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const post = formatData(data, content, locale, slug)

      return post
    })

    return filteredData.sort((a, b) => {
      if (new Date(a.frontMatter.date) < new Date(b.frontMatter.date)) {
        return 1
      } else {
        return -1
      }
    })
  } else return []
}

export const getLatestsPosts = (locale: string): Array<Post> => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = getFileNamesByLocale(locale)

    const filteredData = fileNames
      .map((filename) => {
        const slug = filename.replace('.mdx', '')

        const fullPath = path.join(postDirectory, filename)

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const front_matter = formatData(data, content, locale, slug)

        return {
          slug,
          ...front_matter,
        }
      })
      .filter((_, index) => index < 3)

    return filteredData.sort((a, b) => {
      if (new Date(a.frontMatter.date) < new Date(b.frontMatter.date)) {
        return 1
      } else {
        return -1
      }
    })
  } else return []
}

export const getAllPostSlugs = () => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = getFileNamesByLocale() as {
      locale: string
      fileName: string
    }[]

    const slugs = fileNames.map(({ fileName, locale }) => {
      return {
        params: {
          slug: fileName.replace('.mdx', ''),
        },
        locale,
      }
    })

    return slugs
  } else {
    return []
  }
}

export const getPostBySlug = async (slug: string, locale: string) => {
  const postLocaleDirectory = getPostLocaleDirectory(locale)

  const fullPath = path.join(postLocaleDirectory, `${slug}.mdx`)
  const postContent = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(postContent)

  const frontMatter = formatData(data, content, locale, slug)

  return {
    slug,
    ...frontMatter,
  }
}
