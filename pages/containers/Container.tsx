import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import images from '../../public/assets/images'
import { useRouter } from 'next/dist/client/router'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'

interface ContainerProps {
  children?: React.ReactNode[] | React.ReactNode
}

type MenuOption = {
  name: string
  path: string
}

export default function Container({ children, ...props }: ContainerProps) {
  const currentYear = new Date().getFullYear()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const { t } = useTranslation('common')

  const menuOptions: Array<MenuOption> = [
    {
      name: t('home'),
      path: '/',
    },
    {
      name: t('blog'),
      path: '/blog',
    },
    {
      name: t('about'),
      path: '/about',
    },
  ]

  return (
    <div id="container" className="bg-white dark:bg-black">
      <Head>
        <title>Bruno Frigeri</title>
        <link rel="icon" href="/assets/avatar.jpg" />
      </Head>
      <nav className="max-w-4xl flex flex-row justify-between bg-white dark:bg-black mx-auto items-center w-full my-8">
        <div className="flex flex-row items-center">
          <Image
            className="rounded-full"
            src={images.avatar.src}
            height={60}
            width={60}
          />
          <div id="avatar-description" className="flex flex-col px-4">
            <h2 className="text-lg text-black dark:text-white">
              Bruno Frigeri
            </h2>
            <p className="text-description_light dark:text-description_dark">
              {t('avatar-description')}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {menuOptions?.length &&
            menuOptions.map((option, index) => {
              return (
                <div key={index}>
                  <Link href={option.path}>
                    <a className="text-sm md:text-base mx-2 text-black dark:text-white">
                      {option.name}
                    </a>
                  </Link>
                  {router.pathname === option.path ? (
                    <div className="mx-2 h-0.5 bg-highlight_light dark:bg-highlight_dark" />
                  ) : (
                    <div className="mx-2 h-0.5" />
                  )}
                </div>
              )
            })}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-7 h-7 bg-light_toggle dark:bg-dark_toggle rounded mx-8 flex justify-center items-center focus:outline-none"
          >
            <Image
              src={theme === 'light' ? images.moon.src : images.sun.src}
              width={15}
              height={15}
            />
          </button>
        </div>
      </nav>
      <main className="max-w-3xl flex w-full mx-auto bg-white dark:bg-black">
        {children}
      </main>
      <footer className="max-w-4xl flex flex-row justify-between text-black dark:text-white mx-auto items-center w-full my-8">
        <span className="text-sm md:text-base">
          {currentYear}. Made by&nbsp;{' '}
          <span className="text-sm md:text-base text-highlight_light dark:text-highlight_dark">
            myself.
          </span>
        </span>
        <span className="text-xs md-text-sm text-gray-800">
          Illustrations used in this
          <br />
          website by Freepik Storyset
        </span>
        <div className="flex flex-row items-center">
          <div className="cursor-pointer px-2">
            <Link
              href="/"
              locale={
                router.locale === 'en'
                  ? `pt-BR${router.pathname}`
                  : `en${router.pathname}`
              }
            >
              <div>
                <Image src={images.usa.src} height={30} width={30} />
              </div>
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link
              href="/"
              locale={
                router.locale === 'pt-BR'
                  ? `en${router.pathname}`
                  : `pt-BR${router.pathname}`
              }
            >
              <div>
                <Image src={images.brazil.src} height={30} width={30} />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
