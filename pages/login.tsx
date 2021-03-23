import { useTheme } from 'next-themes'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import icons from '../public/assets/icons'
import images from '../public/assets/images'
import Button from './components/Button'
import Input, { FIELD_TYPE } from './components/Input'

export default function Login({}) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { theme, setTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <div id="container" className="bg-white dark:bg-black">
      <Head>
        <title>Bruno Frigeri</title>
        <link rel="icon" href="/assets/avatar.jpg" />
      </Head>
      <nav className="max-w-4xl flex flex-row justify-end bg-white dark:bg-black mx-auto items-center w-full my-8">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="w-9 h-9 bg-light_toggle dark:bg-dark_toggle rounded mx-8 flex justify-center items-center focus:outline-none"
        >
          <Image
            src={theme === 'light' ? images.moon.src : images.sun.src}
            width={20}
            height={20}
          />
        </button>
      </nav>
      <div className="max-w-lg flex flex-col justify-center bg-white dark:bg-black mx-auto">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full"
            src={images.avatar.src}
            height={80}
            width={80}
          />
          <div className="flex flex-col py-5 items-center">
            <h1 className="md:text-3xl text-black dark:text-white">SIGN IN</h1>
            <h3 className="text-base md:text-lg text-center py-4 text-description_light dark:text-description_dark">
              Hello Bruno. Sign in and start
              <br />
              managing your portfolio!
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log(username, password)
            }}
            className="max-w-lg min-w-full md:min-w-0 w-9/12 min-w-0 mx-auto"
          >
            <Input
              field={'Username'}
              type={FIELD_TYPE.DEFAULT}
              icon={icons.profileIcon.src}
              placeholder={'Your username.'}
              value={username}
              setValue={setUsername}
            />
            <Input
              type={FIELD_TYPE.PASSWORD}
              icon={icons.lockIcon.src}
              field={'Password'}
              placeholder={'Your password.'}
              value={password}
              setValue={setPassword}
            />
            <Button className="w-full my-8" buttonType={'submit'}>
              Sign in
            </Button>
            <span
              id="forgot-password"
              className="flex justify-center text-black dark:text-white text-xs md:text-sm"
            >
              Forgot password?&nbsp;{' '}
              <Link href="/">
                <span className="text-highlight_light dark:text-highlight_dark">
                  Reset
                </span>
              </Link>
            </span>
          </form>
        </div>
      </div>
      <footer className="max-w-2xl flex flex-row justify-center text-black dark:text-white mx-auto items-center w-full mt-8">
        <span className="text-sm md:text-base">
          {currentYear}. Made by&nbsp;{' '}
          <span className="text-sm md:text-base text-highlight_light dark:text-highlight_dark">
            myself.
          </span>
        </span>
      </footer>
    </div>
  )
}
