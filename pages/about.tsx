import React from 'react'
import Container from './containers/Container'
import Image, { ImageProps } from 'next/image'
import images from '../public/assets/images'
import { useTheme } from 'next-themes'

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

  const companies: Array<ImageProps> = [
    {
      alt: 'globalsys',
      src: theme === 'light' ? images.globalsys.src : images.darkGlobalsys.src,
      height: 50,
      width: 100,
    },
    {
      alt: 'g2i',
      src: images.g2i.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'multicast',
      src: images.multicast.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'paytime',
      src: images.paytime.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'skilopay',
      src: images.skilopay.src,
      height: 50,
      width: 50,
    },
    {
      alt: 'v1app',
      src: images.v1app.src,
      height: 50,
      width: 50,
    },
  ]

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
          <h1 className="text-black dark:text-white">
            Companies I've work with
          </h1>
          {companies?.length && (
            <div className="py-6 grid grid-flow-col grid-rows-2 gap-4 md:grid-flow-col md:grid-rows-1">
              {companies.map((skill, index) => (
                <Image key={index} layout="intrinsic" {...skill} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
