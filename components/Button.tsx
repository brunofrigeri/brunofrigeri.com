import React from 'react'

interface ButtonProps {
  children: string
  onClick?(): void
  type?: 'fill' | 'bordered'
  className?: string
  buttonType?: 'button' | 'submit'
  target?: '_blank'
  rel?: 'noreferrer noopener'
  href?: string
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
}: ButtonProps) {
  return (
    <a
      type={buttonType}
      href={href}
      target={target}
      rel={rel}
      className={
        `px-4 ${
          type === 'bordered'
            ? 'border bg-white dark:bg-black border-primaryLight dark:border-primaryDark py-1 '
            : 'bg-primaryLight dark:bg-primaryDark border-0 py-2 '
        } cursor-pointer rounded px-4` + className
      }
      onClick={onClick}
    >
      <span
        className={`${
          type === 'bordered'
            ? 'text-primaryLight dark:text-primaryDark'
            : 'text-white'
        }`}
      >
        {children}
      </span>
    </a>
  )
}
