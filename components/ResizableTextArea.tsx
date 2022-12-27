import React, { useRef } from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'

export interface ResizableTextAreaProps {
  value: string
  setValue: (value: string) => void
  className?: string
  placeholder?: string
}

const ResizableTextArea: React.FC<ResizableTextAreaProps> = ({
  value,
  setValue,
  className,
  placeholder,
}) => {
  const resizableTextAreaRef = useRef(null)

  useAutosizeTextArea(resizableTextAreaRef?.current, value)

  return (
    <textarea
      ref={resizableTextAreaRef}
      placeholder={placeholder}
      className={className + ' resize-none'}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  )
}

export default ResizableTextArea
