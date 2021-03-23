import React from 'react'
import { useTranslation } from 'react-i18next'
import Posts from './components/Posts'
import Search from './components/Search'
import Container from './containers/Container'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Blog({}) {
  const { t } = useTranslation('blog')

  return (
    <Container>
      <div className="flex flex-col">
        <div>
          <h1 className="text-black dark:text-white">Blog</h1>
          <h4 className="my-2 mb-8 text-description_light dark:text-description_dark">
            {t('description', { numberOfArticles: 10 })}
          </h4>
        </div>
        <Search />
        <Posts title={'Most Popular Writing'} hasButton={false} />
        <Posts title={'Latest Writing'} hasButton={false} />
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'blog'])),
  },
})
