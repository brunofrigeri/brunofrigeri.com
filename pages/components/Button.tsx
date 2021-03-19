import React from 'react'

interface ButtonProps {
  children: string
  onClick?(): void
  type?: 'fill' | 'bordered'
}

export default function Button({
  children,
  onClick = () => {},
  type = 'fill',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${
        type === 'bordered'
          ? 'border bg-white dark:bg-black border-highlight_light dark:border-highlight_dark py-1'
          : 'bg-highlight_light dark:bg-highlight_dark border-0 py-2'
      } px-4 rounded-md`}
      onClick={onClick}
    >
      <span
        className={`text-sm md:text-base ${
          type === 'bordered'
            ? 'text-highlight_light dark:text-highlight_dark'
            : 'text-white'
        }`}
      >
        {children}
      </span>
    </button>
  )
}
