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
  ...props
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
            ? 'border bg-white dark:bg-black border-primary_light dark:border-primary_dark py-1 '
            : 'bg-primary_light dark:bg-primary_dark border-0 py-2 '
        } cursor-pointer rounded px-4` + className
      }
      onClick={onClick}
    >
      <span
        className={`${
          type === 'bordered'
            ? 'text-primary_light dark:text-primary_dark'
            : 'text-white'
        }`}
      >
        {children}
      </span>
    </a>
  )
}
