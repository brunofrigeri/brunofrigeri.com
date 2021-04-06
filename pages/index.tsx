import Button from './components/Button'
import Container from './containers/Container'
import React, { useEffect, useState } from 'react'
import { getAllPosts, Post } from '../lib/posts'
import Posts from './components/Posts'
import { useRouter } from 'next/dist/client/router'
import Fuse from 'fuse.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import Search from './components/Search'

interface HomeProps {
  posts: Array<Post>
}

const options = {
  includeMatches: true,
  matchAllOnEmptyQuery: true,
  threshold: 0.4,
  keys: ['title', 'excerpt'],
}

export default function Home({ posts }: HomeProps) {
  const onEmailSentPress = () => {
    const email = 'bpiraja97@gmail.com'

    window.location.href = `mailto:${email}`
  }

  const { t } = useTranslation('home')

  const [search, setSearch] = useState<string>('')
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>([])

  useEffect(() => {
    if (filteredPosts) {
      if (search.length > 0) {
        const fuse = new Fuse(posts, options)
        const postsFound = fuse.search(search)

        setFilteredPosts(
          postsFound.length > 0 ? postsFound.map((post) => post.item) : []
        )
      } else {
        setFilteredPosts(posts)
      }
    }
  }, [search])

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
        <div className="flex flex-col">
          <div>
            <h1 className="text-black dark:text-white">Writing</h1>
            <h4 className="my-2 mb-8 text-description_light dark:text-description_dark">
              {t('blogDescription', { numberOfPosts: posts.length })}
            </h4>
          </div>
          <Search value={search} setValue={setSearch} />
          <Posts
            title={t('allWriting')}
            posts={filteredPosts}
            hasButton={false}
          />
        </div>
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale)

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  }
}
