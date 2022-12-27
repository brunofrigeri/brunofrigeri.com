import React, { useRef } from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'

interface MDXTextAreaProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const MDXTextArea = ({ value, setValue }: MDXTextAreaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(inputRef.current, value)

  const handleTabKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Tab') {
      event.preventDefault()

      setValue((prevValue) => prevValue.concat('  '))
    }
  }

  return (
    <textarea
      ref={inputRef}
      name="mdxTextArea"
      placeholder="Write your post content here..."
      className="border dark:border-white border-black w-full resize-none p-4 overflow-hidden"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onKeyDown={handleTabKey}
    />
  )
}

export default MDXTextArea
