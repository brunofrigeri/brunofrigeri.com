import { getAllPostSlugs, getPostBySlug, Post } from '../../lib/posts'
import Container from '../../containers/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import markdownToHtml from '../../lib/markdown'

export default function BlogBySlug({ source, post }) {
  return (
    <Container meta_description={post.title}>
      <div className="max-w-3xl mx-auto">
        <h1 className="mt-6 text-black dark:text-white">{post.title}</h1>
        <h4 className="my-6 text-description_light dark:text-description_dark">
          {post.date}
        </h4>
      </div>
      <article
        className="max-w-sm md:max-w-3xl prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: source }}
      />
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
  const source = await markdownToHtml(data.content)

  return {
    props: {
      post: data,
      source,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
