import Button from './components/Button'
import Container from './containers/Container'
import React from 'react'
import { getLatestsPosts, Post } from '../lib/posts'
import Posts from './components/Posts'
import { useRouter } from 'next/dist/client/router'

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

  return (
    <Container>
      <div className="flex flex-col">
        <div className="pb-8">
          <h1 className="md:text-4xl text-black dark:text-white">
            Hey, I'm Bruno. Nice to meet you!
          </h1>
          <h2 className="md:text-lg font-light my-2 mb-8 text-description_light dark:text-description_dark">
            I'm a software developer, writer and passionate about traveling from
            Brazil. Always trying to learn more about my work and improve
            everyday.
          </h2>
          <Button
            target={'_blank'}
            rel={'noreferrer noopener'}
            onClick={onEmailSentPress}
          >
            Book a meeting with me!
          </Button>
        </div>
        <Posts
          title={'Latest Writing'}
          posts={posts}
          onSeeAllPress={onSeeAllPress}
        />
      </div>
    </Container>
  )
}

export const getStaticProps = async ({}) => {
  const posts = getLatestsPosts()

  return {
    props: {
      posts,
    },
  }
}
