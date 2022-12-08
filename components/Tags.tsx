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
    <div className="flex flex-row my-2">
      {stacks &&
        stacks.map((stack, index) => (
          <div
            key={index}
            className={`bg-light_toggle dark:bg-dark_toggle p-1.5 rounded-xl  mr-2`}
          >
            <p
              key={index}
              className="text-xs font-medium text-black dark:text-white"
            >
              {getTagName(stack)}
            </p>
          </div>
        ))}
    </div>
  )
}
