import Button from './components/Button'
import Container from './containers/Container'
import React from 'react'
import { getLatestsPosts, Post } from '../lib/posts'
import Posts from './components/Posts'
import { useRouter } from 'next/dist/client/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

interface HomeProps {
  posts: Array<Post>
}

export default function Home({ posts }: HomeProps) {
  const router = useRouter()

  const onSeeAllPress = () => {
    router.replace('/blog')
  }

  const onEmailSentPress = () => {
    const email = 'bpiraja97@gmail.com'

    window.location.href = `mailto:${email}`
  }

  const { t } = useTranslation('home')

  return (
    <Container>
      <div className="flex flex-col">
        <div className="pb-8">
          <h1 className="md:text-4xl text-black dark:text-white">
            {t('title')}
          </h1>
          <h2 className="md:text-lg font-light my-2 mb-8 text-description_light dark:text-description_dark">
            {t('description')}
          </h2>
          <Button
            target={'_blank'}
            rel={'noreferrer noopener'}
            onClick={onEmailSentPress}
          >
            {t('schedule')}
          </Button>
        </div>
        <Posts
          title={t('latests')}
          posts={posts}
          onSeeAllPress={onSeeAllPress}
        />
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => {
  const posts = getLatestsPosts(locale)

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  }
}
