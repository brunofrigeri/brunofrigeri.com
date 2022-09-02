import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'

interface SearchProps {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ value, setValue }: SearchProps) {
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-row items-center w-full rounded-lg border">
      <div className="flex p-2">
        <FaSearch className="text-description_light dark:text-description_dark" />
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
