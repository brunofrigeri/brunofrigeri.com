import React, { useRef } from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'

interface MDXTextAreaProps {
  value: string
  setValue: (value: string) => void
}

const MDXTextArea = ({ value, setValue }: MDXTextAreaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(inputRef.current, value)

  return (
    <textarea
      ref={inputRef}
      name="mdxTextArea"
      className="border border-black w-full resize-none p-4 overflow-hidden"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  )
}

export default MDXTextArea
