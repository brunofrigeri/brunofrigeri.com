import React, { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import Posts from './components/Posts'
import Search from './components/Search'
import Container from './containers/Container'
import { getAllPosts, Post } from '../lib/posts'
import firebase from 'firebase'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
interface BlogProps {
  posts: Array<Post>
}

const options = {
  includeMatches: true,
  matchAllOnEmptyQuery: true,
  threshold: 0.4,
  keys: ['title', 'excerpt'],
}

export default function Blog({ posts }: BlogProps) {
  const [search, setSearch] = useState<string>('')
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>([])

  const { t } = useTranslation('blog')

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
        <div>
          <h1 className="text-black dark:text-white">Blog</h1>
          <h4 className="my-2 mb-8 text-description_light dark:text-description_dark">
            {t('description', { numberOfPosts: posts.length })}
          </h4>
        </div>
        <Search value={search} setValue={setSearch} />
        <Posts
          title={t('allWriting')}
          posts={filteredPosts}
          hasButton={false}
        />
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale)

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    },
  }
}
