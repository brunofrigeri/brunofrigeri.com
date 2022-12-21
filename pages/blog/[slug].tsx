import { getAllPostSlugs, getPostBySlug, Post } from '../../lib/posts'
import Container from '../../containers/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import markdownToHtml from '../../lib/markdown'
import Tags from '../../components/Tags'
import { useRouter } from 'next/router'
import { useLink } from '../../hooks/useLink'
import { useEffect } from 'react'
import { usePostViewsBySlug } from '../../hooks/usePostViewsBySlug'

export default function BlogBySlug({ source, post }) {
  const router = useRouter()

  const { ptBRHref, enHref } = useLink(router)
  const { postView } = usePostViewsBySlug()

  useEffect(() => {
    postView(post.slug, router.locale)
  }, [post.slug, postView, router.locale])

  return (
    <Container
      meta_description={post.title}
      ptBRHref={ptBRHref}
      enHref={enHref}
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="mt-6 text-black dark:text-white">{post.title}</h1>
        <h4 className="my-6 text-descriptionLight dark:text-descriptionDark">
          {post.date}
        </h4>
        <Tags stacks={post.stacks} />
      </div>
      <article
        className="max-w-sm md:max-w-3xl prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: source }}
      />
    </Container>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs()

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
