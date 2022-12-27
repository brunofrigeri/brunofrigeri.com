import React, { useRef } from 'react'

interface MDXTextAreaProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const MDXTextArea = ({ value, setValue }: MDXTextAreaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleTabKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Tab') {
      event.preventDefault()

      setValue((prevValue) => prevValue.concat('  '))
    }
  }

  return (
    <textarea
      ref={inputRef}
      placeholder="Write your post content here..."
      className="flex-auto border dark:border-white border-black w-full resize-none p-4"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onKeyDown={handleTabKey}
    />
  )
}

export default MDXTextArea
