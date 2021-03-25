import fs from 'fs'
import path from 'path'
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

//Finding directory named "posts" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), 'posts')

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

export const getLatestsPosts = (): Array<Post> => {
  //Reads all the files in the post directory
  const fileNames = fs.readdirSync(postDirectory)

  const filteredData = fileNames
    .map((filename) => {
      const slug = filename.replace('.mdx', '')

      const fullPath = path.join(postDirectory, filename)

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const front_matter = formatData(data, content)

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
}

export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(postDirectory)

  return fileNames.map((filename) => {
    return {
      params: {
        slug: filename.replace('.mdx', ''),
      },
    }
  })
}

//Get Post based on Slug
export const getPostBySlug = async (slug: string) => {
  const fullPath = path.join(postDirectory, `${slug}.mdx`)
  const postContent = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(postContent)

  const front_matter = formatData(data, content)

  return {
    slug,
    ...front_matter,
  }
}
