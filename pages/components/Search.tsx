import Image from 'next/image'
import React from 'react'
import icons from '../../public/assets/icons'

interface SearchProps {
  value?: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function Search({ value, setValue }: SearchProps) {
  return (
    <div className="flex flex-row items-center w-full bg-opacity-10 rounded-lg bg-highlight_light dark:bg-highlight_dark dark:bg-opacity-10">
      <div className="flex p-2">
        <Image src={icons.searchIcon.src} width={20} height={20} />
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className="w-full font-custom text-search_light dark:text-search_dark"
        placeholder="Search for some article."
      ></input>
    </div>
  )
}