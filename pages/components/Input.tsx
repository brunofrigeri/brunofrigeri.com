import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import icons from '../../public/assets/icons'

export enum FIELD_TYPE {
  PASSWORD = 'PASSWORD',
  DEFAULT = 'DEFAULT',
}

interface InputProps {
  field: string
  placeholder: string
  type?: FIELD_TYPE
  icon: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function Input({
  field,
  placeholder,
  type = FIELD_TYPE.DEFAULT,
  icon,
  setValue,
  value,
}: InputProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm md:text-base py-4 text-black dark:text-white">
        {field}
      </span>
      <div className="flex flex-row items-center border border-highlight_light dark:border-highlight_dark rounded-lg">
        <div className="flex p-2">
          <Image src={icon} width={20} height={20} />
        </div>
        <input
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
          className="text-sm md:text-base p-2 placeholder-gray-500 dark:placeholder-gray-200 placeholder-opacity-25 dark:placeholder-opacity-25 text-dark_toggle dark:text-light_toggle"
          type={type === FIELD_TYPE.PASSWORD ? 'password' : null}
          placeholder={placeholder}
        ></input>
      </div>
    </div>
  )
}
