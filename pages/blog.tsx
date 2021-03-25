import React, { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import Posts from './components/Posts'
import Search from './components/Search'
import Container from './containers/Container'
import { getAllPosts, Post } from '../lib/posts'

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

  useEffect(() => {
    if (filteredPosts) {
      if (search.length > 0) {
        const fuse = new Fuse(posts, options)
        const postsFound = fuse.search(search)

        console.log(search, postsFound)

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
            {`I started to writing in this blog about the most important
            technologies challenges that I've experienced. At this time I have
            ${posts.length} articles about different subjects. Check it out.`}
          </h4>
        </div>
        <Search value={search} setValue={setSearch} />
        <Posts title={'All Writing'} posts={filteredPosts} hasButton={false} />
      </div>
    </Container>
  )
}

export const getStaticProps = async ({}) => {
  const posts = getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
