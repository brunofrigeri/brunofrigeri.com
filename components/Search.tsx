import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import icons from '../public/assets/icons'

interface SearchProps {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ value, setValue }: SearchProps) {
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-row items-center w-full rounded-lg border">
      <div className="flex p-2">
        <Image alt="search" src={icons.searchIcon.src} width={20} height={20} />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full font-custom placeholder-search_light dark:placeholder-search_dark text-search_light dark:text-search_dark"
        placeholder={t('search')}
      ></input>
    </div>
  )
}
