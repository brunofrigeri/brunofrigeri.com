import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import images from '../public/assets/images'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useRouter } from 'next/dist/client/router'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useLinkProps } from '../hooks/useLink'

interface ContainerProps extends Partial<useLinkProps> {
  children?: React.ReactNode[] | React.ReactNode
  meta_description?: string
}

type MenuOption = {
  name: string
  path: string
}

export default function Container({
  children,
  meta_description,
  enHref,
  ptBRHref,
}: ContainerProps) {
  const currentYear = new Date().getFullYear()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState<boolean>(false)

  const { t } = useTranslation('common')

  const menuOptions: Array<MenuOption> = [
    {
      name: t('home'),
      path: '/',
    },
    {
      name: t('about'),
      path: '/about',
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeIcon = useCallback(() => {
    if (!mounted) return null

    const isLight = theme === 'light'

    return isLight ? <FaMoon /> : <FaSun color="white" />
  }, [mounted, theme])

  return (
    <div
      id="container"
      className="flex flex-col min-h-screen bg-white dark:bg-black"
    >
      <Head>
        <title>Bruno Frigeri</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta_description} />
        <link
          rel="canonical"
          href={`https://brunofrigeri.com${router.asPath}`}
        />
        <meta property="og:type" content={'website'} />
        <meta property="og:site_name" content="Bruno Frigeri" />
        <meta
          property="og:description"
          content={
            meta_description ||
            "I'm a software developer, writer and passionate about traveling from Brazil. Always trying to learn more about my work and improve everyday."
          }
        />
        <meta
          property="og:title"
          content={'Bruno Frigeri - Software Developer'}
        />
        <meta property="og:image" />
      </Head>
      <nav className="max-w-4xl flex flex-row justify-between bg-white dark:bg-black mx-auto items-center w-full my-8">
        <Link href="/">
          <a className="cursor-pointer flex flex-row items-center">
            <Image
              className="rounded-full"
              src={images.avatar.src}
              alt="BF"
              height={48}
              width={48}
            />
            <div id="avatar-description" className="flex flex-col px-4">
              <h2 className="text-lg text-black dark:text-white">
                Bruno Frigeri
              </h2>
              <p className="text-description_light dark:text-description_dark">
                {t('description')}
              </p>
            </div>
          </a>
        </Link>
        <div className="flex items-center">
          {menuOptions?.length &&
            menuOptions.map((option, index) => {
              return (
                <div key={index}>
                  <Link href={option.path}>
                    <a className="md:text-base mx-2 text-black dark:text-white">
                      {option.name}
                    </a>
                  </Link>
                  {router.pathname === option.path ? (
                    <div className="mx-2 h-0.5 bg-primary_light dark:bg-primary_dark" />
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
            {renderThemeIcon()}
          </button>
        </div>
      </nav>
      <main className="flex-grow mx-auto max-w-3xl bg-white dark:bg-black">
        {children}
      </main>
      <footer className="max-w-4xl flex flex-row justify-between text-black dark:text-white mx-auto items-center w-full my-8">
        <span className="md:text-sm">
          © {currentYear}. {t('madeBy')}&nbsp;
          <span className="md:text-sm text-primary_light dark:text-primary_dark">
            {t('me')}.
          </span>
        </span>
        <div>
          <Link href={ptBRHref ?? '/'} locale="pt-BR">
            <a>
              <Image
                className="cursor-pointer pr-1"
                src={images.brazil.src}
                alt="brazil-locale"
                height={32}
                width={32}
              />
            </a>
          </Link>
          <Link href={enHref ?? '/'} locale="en">
            <a>
              <Image
                className="cursor-pointer pl-1"
                src={images.usa.src}
                alt="en-locale"
                height={32}
                width={32}
              />
            </a>
          </Link>
        </div>
      </footer>
    </div>
  )
}
