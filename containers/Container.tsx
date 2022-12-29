import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import images from '../public/assets/images'
import { useRouter } from 'next/dist/client/router'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useLinkProps } from '../hooks/useLink'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { Config } from 'tailwindcss/types/config'
import ThemeButton from '../components/ThemeButton'

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
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const fullConfig = resolveConfig(tailwindConfig as Config)

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

  return (
    <div
      id="container"
      className="flex flex-col min-h-screen transition-colors bg-white dark:bg-black"
    >
      <Head>
        <title>Bruno Frigeri</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta_description} />
        <link
          rel="canonical"
          href={`https://brunofrigeri.com${router.asPath}`}
        />
        <meta property="og:type" content="website" />
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
          content="Bruno Frigeri - Software Developer"
        />
        <meta property="og:image" />
      </Head>
      <nav className="max-w-4xl flex flex-row justify-between bg-white transition-colors dark:bg-black mx-auto items-center w-full my-8">
        <Link href="/" className="cursor-pointer flex flex-row items-center">
          <Image
            className="rounded-full"
            src={images.avatar.src}
            alt="BF"
            priority
            height={48}
            width={48}
          />
          <div id="avatar-description" className="flex flex-col px-4">
            <h2 className="text-lg text-black dark:text-white">
              Bruno Frigeri
            </h2>
            <p className="text-descriptionLight dark:text-descriptionDark">
              {t('description')}
            </p>
          </div>
        </Link>
        <div className="flex items-center">
          {menuOptions?.length &&
            menuOptions.map((option) => {
              const isCurrentOption = router.pathname === option.path

              return (
                <div
                  key={option.path}
                  className="rounded hover:bg-gray-100 hover:dark:bg-gray-600 transition-all px-2 py-1 mx-2"
                >
                  <Link
                    href={option.path}
                    className={`md:text-base text-black dark:text-white ${
                      isCurrentOption ? 'font-bold' : 'opacity-70'
                    }`}
                  >
                    {option.name}
                  </Link>
                </div>
              )
            })}
          <ThemeButton
            theme={theme}
            setTheme={setTheme}
            lightColor={fullConfig.theme.colors['toggleDark']}
            darkColor={fullConfig.theme.colors['toggleLight']}
            mounted={mounted}
          />
        </div>
      </nav>
      <main className="flex-grow transition-colors mx-auto max-w-3xl bg-white dark:bg-black">
        {children}
      </main>
      <footer className="max-w-4xl flex flex-row justify-between text-black dark:text-white mx-auto items-center w-full my-8">
        <span className="md:text-sm">
          © {currentYear}. {t('madeBy')}&nbsp;
          <span className="md:text-sm text-primaryLight dark:text-primaryDark">
            {t('me')}.
          </span>
        </span>
        <div className="flex flex-column">
          <Link href={ptBRHref ?? '/'} locale="pt-BR">
            <Image
              className="cursor-pointer pr-1"
              src={images.brazil.src}
              priority
              alt="brazil-locale"
              height={36}
              width={36}
            />
          </Link>
          <Link href={enHref ?? '/'} locale="en">
            <Image
              className="cursor-pointer pl-1"
              src={images.usa.src}
              alt="en-locale"
              priority
              height={36}
              width={36}
            />
          </Link>
        </div>
      </footer>
    </div>
  )
}
