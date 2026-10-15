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
  icon?: React.ReactElement
}

const ArrowIcon = (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <path d="M3 10h14M11 4l6 6-6 6" />
  </svg>
)

export default function Button({
  children,
  onClick = () => {},
  type = 'fill',
  className = '',
  buttonType = 'button',
  icon = ArrowIcon,
}: ButtonProps) {
  const variant =
    type === 'bordered'
      ? 'bg-paper text-ink border border-ink'
      : 'bg-ink text-paper border-0'

  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-onAccent inline-flex items-center justify-center gap-[14px] min-h-[56px] px-8 rounded-full text-[17px] font-semibold ${variant} ${className}`}
    >
      <span>{children}</span>
      {icon}
    </button>
  )
}
