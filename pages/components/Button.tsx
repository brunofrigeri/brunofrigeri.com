import React from 'react'

interface ButtonProps {
  children: string
  onClick?(): void
  type?: 'fill' | 'bordered'
  className?: string
  buttonType?: 'button' | 'submit'
}

export default function Button({
  children,
  onClick = () => {},
  type = 'fill',
  className,
  buttonType = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      className={
        `${
          type === 'bordered'
            ? 'border bg-white dark:bg-black border-highlight_light dark:border-highlight_dark py-1'
            : 'bg-highlight_light dark:bg-highlight_dark border-0 py-2'
        } px-4 rounded-md ` + className
      }
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
