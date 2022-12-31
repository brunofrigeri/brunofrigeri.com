import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

interface ButtonProps {
  children: string
  onClick?(): void
  type?: 'fill' | 'bordered'
  className?: string
  buttonType?: 'button' | 'submit'
  target?: '_blank'
  rel?: 'noreferrer noopener'
  href?: string
  icon?: React.ReactElement
}

export default function Button({
  children,
  onClick = () => {},
  type = 'fill',
  className,
  buttonType = 'button',
  target,
  href,
  rel,
  icon = (
    <FaArrowRight
      className={
        type === 'bordered'
          ? 'text-primaryLight dark:text-primaryDark'
          : 'text-white'
      }
    />
  ),
}: ButtonProps) {
  return (
    <a
      type={buttonType}
      href={href}
      target={target}
      rel={rel}
      className={
        `inline-flex items-center px-4 py-2 ${
          type === 'bordered'
            ? 'border bg-white dark:bg-black border-primaryLight dark:border-primaryDark'
            : 'bg-primaryLight dark:bg-primaryDark border-0'
        } cursor-pointer rounded ` + className
      }
      onClick={onClick}
    >
      <span
        className={`text-lg ${
          type === 'bordered'
            ? 'text-primaryLight dark:text-primaryDark'
            : 'text-white'
        } mr-2`}
      >
        {children}
      </span>
      {icon}
    </a>
  )
}
