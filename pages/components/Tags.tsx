import React from 'react'

export type Stack = Array<string>

interface TagsProps {
  stacks: Stack
}

export default function Tags({ stacks }: TagsProps) {
  const getTagName = (stack: string) => {
    return stack.toLocaleLowerCase().replace('_', '-')
  }

  return (
    <div className="flex flex-row my-2">
      {stacks &&
        stacks.map((stack, index) => (
          <div
            key={index}
            className={`border border-gray-400 dark:border-gray-600 0 p-1 rounded-lg mr-2`}
          >
            <p
              key={index}
              className="text-xs font-semibold text-gray-400 dark:text-gray-600"
            >
              #{getTagName(stack)}
            </p>
          </div>
        ))}
    </div>
  )
}
