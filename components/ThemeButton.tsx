import React, { useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

interface IThemeButtonProps {
  theme?: string
  setTheme(theme: string): void
  lightColor: string
  darkColor: string
  mounted?: boolean
}

const ThemeButton = ({
  theme = 'light',
  setTheme,
  lightColor,
  darkColor,
  mounted = false,
}: IThemeButtonProps) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const isLight = theme === 'light'

  const onThemeChangeClick = () => {
    setClicked(true)
    setTimeout(() => {
      setTheme(isLight ? 'dark' : 'light')
      setClicked(false)
    }, 300)
  }

  const className = `rounded flex justify-center items-center ${
    clicked ? 'animate-spin' : ''
  }`

  return (
    <button
      aria-label="Toggle Theme"
      type="button"
      onClick={onThemeChangeClick}
      className="w-7 h-7 bg-toggleLight dark:bg-toggleDark rounded mx-8 hover:border border-gray-300 dark:border-gray-500"
    >
      <div className={className}>
        {mounted &&
          (isLight ? (
            <FaMoon color={lightColor} />
          ) : (
            <FaSun color={darkColor} />
          ))}
      </div>
    </button>
  )
}

export default ThemeButton
