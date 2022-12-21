import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import en from 'date-fns/locale/en-US'
import { storage } from './firebase'

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
  locale: string
  excerpt: string
  date: string
  reading_time: IReadTimeResults
  slug: string
  featured_image?: string
  stacks: Array<string>
  views?: number
}

const postDirectory = path.join(process.cwd(), 'posts')
const postPtBRDirectory = path.join(process.cwd(), 'posts', 'pt-BR')
const postEnDirectory = path.join(process.cwd(), 'posts', 'en')

const formatData = (data, content, locale) => {
  const reading_time = readingTime(content)

  const isPtBrLocale = locale === 'pt-BR'

  const reading = isPtBrLocale
    ? {
        ...reading_time,
        text: reading_time.text.replace('read', 'de leitura'),
      }
    : reading_time

  const formattedDate = format(new Date(data.date), 'MMMM dd, yyyy', {
    locale: isPtBrLocale ? ptBR : en,
  })

  return {
    ...data,
    author: data.author,
    content,
    title: data.title,
    stacks: data.stacks,
    locale: data.locale,
    excerpt: data.excerpt,
    date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    featured_image: data.featuredImage || '',
    reading_time: reading,
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

export const getAllPosts = (locale: string): Array<Post> => {
  if (fs.existsSync(postDirectory)) {
    const postLocaleDirectory = getPostLocaleDirectory(locale)
    const fileNames = getFileNamesByLocale(locale)

    if (fileNames.length === 0) return []

    const filteredData = fileNames.map((filename) => {
      const slug = filename.replace('.mdx', '')

      const fullPath = path.join(postLocaleDirectory, filename)

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
    const fileNames = getFileNamesByLocale(locale)

    const filteredData = fileNames
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

export const getAllPostSlugs = async () => {
  const fileNames = await storage.bucket().getFiles({})
  const slugs = fileNames[0]
    .map((item) => {
      const [locale, fileName] = item.name.split('/')

      if (!fileName) {
        return undefined
      }

      return {
        params: {
          slug: fileName.replace('.mdx', ''),
          locale: locale,
        },
      }
    })
    .filter(Boolean)

  return slugs
}

export const getPostBySlug = async (slug: string, locale: string) => {
  const filePath = locale + '/' + slug + '.mdx'
  const fileContent = await storage.bucket().file(filePath).get()

  const postContent = await fileContent[0].download()
  const body = postContent[0].toString('utf8')

  // Parse body of mdx file
  const { data, content } = matter(body)
  const frontMatter = formatData(data, content, locale)

  return {
    slug,
    ...frontMatter,
  }

  // const postContent = storage.bucket().
  // const postLocaleDirectory = getPostLocaleDirectory(locale)
  // const fullPath = path.join(postLocaleDirectory, `${slug}.mdx`)
  // const postContent = fs.readFileSync(fullPath, 'utf8')
  // const { data, content } = matter(postContent)
  // const front_matter = formatData(data, content, locale)
  // return {
  //   slug,
  //   ...front_matter,
  // }
}
