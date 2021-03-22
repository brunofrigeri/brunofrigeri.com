import React, { useEffect } from 'react'
import Container from './containers/Container'
import Image, { ImageProps } from 'next/image'
import images from '../public/assets/images'
import { useTheme } from 'next-themes'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function About({}) {
  const { theme } = useTheme()

  const { t } = useTranslation('about')

  const skills: Array<ImageProps> = [
    {
      src: images.react.src,
      height: 50,
      width: 50,
    },
    {
      src: images.ts.src,
      height: 50,
      width: 50,
    },
    {
      src: images.js.src,
      height: 50,
      width: 50,
    },
    {
      src: theme === 'light' ? images.nodejs.src : images.darkNode.src,
      height: 50,
      width: 100,
    },
    {
      src: theme === 'light' ? images.next.src : images.darkNext.src,
      height: 50,
      width: 100,
    },
    {
      src: theme === 'light' ? images.apollo.src : images.darkApollo.src,
      height: 50,
      width: 100,
    },
    {
      src: images.graphql.src,
      height: 50,
      width: 50,
    },
    {
      src: images.gatsby.src,
      height: 50,
      width: 50,
    },
  ]

  const companies: Array<ImageProps> = [
    {
      src: theme === 'light' ? images.globalsys.src : images.darkGlobalsys.src,
      height: 50,
      width: 100,
    },
    {
      src: images.g2i.src,
      height: 50,
      width: 50,
    },
    {
      src: images.multicast.src,
      height: 50,
      width: 50,
    },
    {
      src: images.paytime.src,
      height: 50,
      width: 50,
    },
    {
      src: images.skilopay.src,
      height: 50,
      width: 50,
    },
    {
      src: images.v1app.src,
      height: 50,
      width: 50,
    },
  ]

  return (
    <Container>
      <div>
        <div>
          <h1 className="text-black dark:text-white">{t('who-am-i-title')}</h1>
          <h4 className="my-2 mb-8 text-description_light dark:text-description_dark">
            {t('who-am-i-description')}
          </h4>
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">{t('skills')}</h1>
          <div className="py-6 grid grid-flow-col grid-rows-2 gap-4 md:grid-flow-col md:grid-rows-1">
            {skills?.length &&
              skills.map((skill, index) => (
                <Image key={index} layout="intrinsic" {...skill} />
              ))}
          </div>
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">{t('companies')}</h1>
          <div className="py-6 grid grid-flow-col grid-rows-2 gap-4 md:grid-flow-col md:grid-rows-1">
            {companies?.length &&
              companies.map((skill, index) => (
                <Image key={index} layout="intrinsic" {...skill} />
              ))}
          </div>
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">{t('timeline')}</h1>
          {/* <div className="py-6 grid grid-flow-col grid-rows-2 gap-4 md:grid-flow-col md:grid-rows-1">
            {companies?.length &&
              companies.map((skill) => <Image layout="intrinsic" {...skill} />)}
          </div> */}
        </div>
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'about'])),
  },
})
