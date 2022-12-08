import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSearch } from 'react-icons/ai'

interface SearchProps {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ value, setValue }: SearchProps) {
  const { t } = useTranslation('home')

  return (
    <div className="flex flex-row items-center w-full rounded-full border">
      <div className="flex p-2">
        <AiOutlineSearch
          size={25}
          className="text-descriptionLight dark:text-descriptionDark"
        />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full font-light placeholder-searchLight dark:placeholder-searchDark"
        placeholder={t('search')}
      ></input>
    </div>
  )
}
