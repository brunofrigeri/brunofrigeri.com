import React from 'react'
import { getAllPostSlugs, getPostBySlug, Post } from '../../lib/posts'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import Container from '../containers/Container'
import Tags from '../components/Tags'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface SlugProps {
  post: Post
  source: MdxRemote.Source
}

export default function Slug({ post, source }: SlugProps) {
  const content = hydrate(source)

  return (
    <Container meta_description={post.title}>
      <article>
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-6 text-black dark:text-white">{post.title}</h1>
          <Tags stacks={post.stacks} />
          <h4 className="my-6 text-description_light dark:text-description_dark">
            {post.date}
          </h4>
          <div className="prose dark:prose-dark text-base">{content}</div>
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

export async function getStaticProps({ params, locale }) {
  const data: Post = await getPostBySlug(params.slug, locale)
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
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
