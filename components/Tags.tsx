import React from 'react'

export type Stack = Array<string>

interface TagsProps {
  stacks: Stack
}

export default function Tags({ stacks }: TagsProps) {
  const getTagName = (stack: string) => {
    const lowerCaseTagName = stack.toLocaleLowerCase().replace('_', '-')
    return lowerCaseTagName.charAt(0).toUpperCase() + lowerCaseTagName.slice(1)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {stacks &&
        stacks.map((stack, index) => (
          <span
            key={index}
            className="border border-ink px-3.5 py-1.5 font-mono text-[13px] font-normal"
          >
            {getTagName(stack)}
          </span>
        ))}
    </div>
  )
}
