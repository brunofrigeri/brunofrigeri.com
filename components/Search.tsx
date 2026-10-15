import React from 'react'
import { useTranslation } from 'react-i18next'

interface SearchProps {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ value, setValue }: SearchProps) {
  const { t } = useTranslation('home')

  return (
    <input
      type="search"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      aria-label={t('search')}
      placeholder={t('search')}
      className="w-full min-h-[48px] box-border border border-ink px-4 text-base font-normal text-ink placeholder:text-muted"
    />
  )
}
