import React from 'react'
import { getAllPostSlugs, getPostBySlug, Post } from '../../lib/posts'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import Container from '../containers/Container'
import Tags from '../components/Tags'

interface SlugProps {
  post: Post
  source: MdxRemote.Source
}

export default function Slug({ post, source }: SlugProps) {
  const content = hydrate(source)

  return (
    <Container>
      <article>
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-6 text-black dark:text-white">{post.title}</h1>
          <Tags stacks={post.stacks} />
          <h2 className="my-6 text-description_light text-xs md:text-sm dark:text-description_dark">
            {post.date}
          </h2>
          <div className="prose dark:prose-dark">{content}</div>
        </div>
      </article>
    </Container>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs()

  if (!paths)
    return {
      paths: [],
      fallback: false,
    }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const data: Post = await getPostBySlug(params.slug)
  const mdxSource = await renderToString(data.content, {
    components: null,
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
        require('remark-copy-linked-files'),
      ],
      rehypePlugins: [require('mdx-prism')],
    },
  })

  return {
    props: {
      post: data,
      source: mdxSource,
    },
  }
}
