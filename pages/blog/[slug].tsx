import { getAllPostSlugs, getPostBySlug } from '../../lib/posts'
import Container from '../../containers/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import markdownToHtml from '../../lib/markdown'
import { useRouter } from 'next/router'
import { useLink } from '../../hooks/useLink'
import { useEffect } from 'react'
import { usePostViewsBySlug } from '../../hooks/usePostViewsBySlug'
import Article from '../../components/Article'
import { Post } from '../../lib/types'

interface IBlogBySlugProps {
  source: string
  post: Post
}

const BlogBySlug: React.FC<IBlogBySlugProps> = ({ source, post }) => {
  const router = useRouter()

  const { ptBRHref, enHref } = useLink(router)
  const { postView } = usePostViewsBySlug()

  const { frontMatter } = post

  useEffect(() => {
    postView(frontMatter.slug, router.locale)
  }, [frontMatter.slug, postView, router.locale])

  return (
    <Container
      meta_description={frontMatter.title}
      ptBRHref={ptBRHref}
      enHref={enHref}
    >
      <Article frontMatter={frontMatter} content={source} />
    </Container>
  )
}

export default BlogBySlug

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
