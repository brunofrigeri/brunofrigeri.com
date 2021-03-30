import React from 'react'
import Container from './containers/Container'
import Image, { ImageProps } from 'next/image'
import images from '../public/assets/images'
import { useTheme } from 'next-themes'
import Button from './components/Button'

export default function About({}) {
  const { theme } = useTheme()

  const skills: Array<ImageProps> = [
    {
      alt: 'react',
      src: images.react.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'ts',
      src: images.ts.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'js',
      src: images.js.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'nodejs',
      src: theme === 'light' ? images.nodejs.src : images.darkNode.src,
      height: 50,
      width: 100,
    },
    {
      alt: 'next',
      src: theme === 'light' ? images.next.src : images.darkNext.src,
      height: 50,
      width: 100,
    },
    {
      alt: 'apollo',
      src: theme === 'light' ? images.apollo.src : images.darkApollo.src,
      height: 50,
      width: 100,
    },
    {
      alt: 'graphql',
      src: images.graphql.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'gatsby',
      src: images.gatsby.src,
      height: 50,
      width: 50,
    },
  ]

  const onEmailSentPress = () => {
    const email = 'bpiraja97@gmail.com'

    window.location.href = `mailto:${email}`
  }

  return (
    <Container>
      <div>
        <div>
          <h1 className="text-black dark:text-white">Who am I?</h1>
          <h2 className="text-sm font-light my-2 mb-8 text-description_light dark:text-description_dark">
            I'm Bruno, software engineer for the past 3 years, working always to
            be responsible for the companies that I worked with, achieve their
            goals through an application or website.
          </h2>
          <Button
            target={'_blank'}
            rel={'noreferrer noopener'}
            onClick={onEmailSentPress}
          >
            Let's book a meeting
          </Button>
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">
            Skills and Technologies
          </h1>
          {skills?.length && (
            <div className="py-6 grid grid-flow-col grid-rows-2 gap-4 md:grid-flow-col md:grid-rows-1">
              {skills.map((skill, index) => (
                <Image key={index} layout="intrinsic" {...skill} />
              ))}
            </div>
          )}
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">Resume</h1>
          <h2 className="text-sm font-light my-2 mb-8 text-description_light dark:text-description_dark">
            Want to know more about my experience, projects, jobs and companies
            that I already work with? You can saw my Resume in the link above.
          </h2>
          <Button href={'/cv.pdf'} target={'_blank'} type={'bordered'}>
            See Resume
          </Button>
        </div>
      </div>
    </Container>
  )
}
