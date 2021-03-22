import Image from 'next/image'
import images from '../public/assets/images'
import Button from './components/Button'
import Posts from './components/Posts'
import Container from './containers/Container'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

export default function Home() {
  const { theme } = useTheme()

  const { t } = useTranslation('index')

  return (
    <Container>
      <div>
        <div className="flex flex-row justify-between items-start">
          <div>
            <h1 className="md:text-4xl text-black dark:text-white">
              {t('presentation-title')
                .split('\n')
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <br />
                    {item}
                  </React.Fragment>
                ))}
            </h1>
            <h4 className="md:text-lg my-2 mb-8 text-description_light dark:text-description_dark">
              {t('presentation-description')}
            </h4>
            <Button>{t('meeting')}</Button>
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
        <Posts title="Most Popular Writing" />
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'index'])),
  },
})
