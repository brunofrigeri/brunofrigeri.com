import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import images from '../../public/assets/images'
import { useRouter } from 'next/dist/client/router'
import { useTheme } from 'next-themes'

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

  const menuOptions: Array<MenuOption> = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Blog',
      path: '/blog',
    },
    {
      name: 'About',
      path: '/about',
    },
  ]

  return (
    <div
      id="container"
      className="flex flex-col min-h-screen bg-white dark:bg-black"
    >
      <Head>
        <title>Bruno Frigeri</title>
        <meta name="description" content={'Bruno Frigeri'} />
        <link rel="icon" href="/assets/avatar.jpg" />
      </Head>
      <nav className="max-w-4xl flex flex-row justify-between bg-white dark:bg-black mx-auto items-center w-full my-8">
        <div className="flex flex-row items-center">
          <Image
            className="rounded-full"
            src={images.avatar.src}
            alt="BF"
            height={60}
            width={60}
          />
          <div id="avatar-description" className="flex flex-col px-4">
            <h2 className="text-lg text-black dark:text-white">
              Bruno Frigeri
            </h2>
            <p className="text-description_light dark:text-description_dark">
              Mobile and Frontend developer
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
              alt="ChangeTheme"
              src={theme === 'light' ? images.moon.src : images.sun.src}
              width={15}
              height={15}
            />
          </button>
        </div>
      </nav>
      <main className="flex-grow mx-auto max-w-3xl bg-white dark:bg-black">
        {children}
      </main>
      <footer className="max-w-4xl flex flex-row justify-between text-black dark:text-white mx-auto items-center w-full my-8">
        <span className="text-xs md:text-sm">
          © {currentYear}. Made by&nbsp;
          <span className="text-xs md:text-sm text-highlight_light dark:text-highlight_dark">
            myself.
          </span>
        </span>
      </footer>
    </div>
  )
}
