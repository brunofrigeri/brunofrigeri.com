import Image from 'next/image'
import images from '../public/assets/images'
import Button from './components/Button'
import Container from './containers/Container'
import { useTheme } from 'next-themes'
import React from 'react'
import { getLatestsPosts, Post } from '../lib/posts'
import Posts from './components/Posts'
import { useRouter } from 'next/dist/client/router'

interface HomeProps {
  posts: Array<Post>
}

export default function Home({ posts }: HomeProps) {
  const { theme } = useTheme()
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
      <div className="min-w-full">
        <div className="flex flex-row justify-between items-start">
          <div>
            <h1 className="md:text-4xl te xt-black dark:text-white">
              Hey, I'm Bruno.
              <br />
              Nice to meet you!
            </h1>
            <h2 className="md:text-lg font-light my-2 mb-8 text-description_light dark:text-description_dark">
              I'm a software developer, writer and
              <br />
              passionate about traveling from Brazil.
            </h2>
            <Button onClick={onEmailSentPress}>Book a meeting with me!</Button>
          </div>
          <div id="presentation">
            <Image
              src={
                theme === 'light'
                  ? images.presentationLight.src
                  : images.presentationDark.src
              }
              width={300}
              height={300}
            />
          </div>
        </div>
        <Posts
          title="Latest Writing"
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
