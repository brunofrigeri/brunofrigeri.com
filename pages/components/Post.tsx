import React from 'react'

interface PostProps {
  title?: string
  description?: string
  date?: string
  minutesOfRead?: number
}

export default function Post({
  title,
  description,
  date,
  minutesOfRead,
}: PostProps) {
  return (
    <div className="my-8">
      {title && (
        <h3 className="md:text-lg text-black dark:text-white">{title}</h3>
      )}
      {description && (
        <h5 className="md:text-sm my-1 text-description_light dark:text-description_dark">
          {description}
        </h5>
      )}
      <div className="flex flex-row my-4">
        {date && (
          <h5 className="text-xs text-description_light dark:text-description_dark">
            {date}
          </h5>
        )}
        <h5 className="text-xs text-description_light dark:text-description_dark">
          &nbsp;&nbsp;|&nbsp;&nbsp;
        </h5>
        {minutesOfRead && (
          <h5 className="text-xs text-description_light dark:text-description_dark">
            {minutesOfRead}&nbsp;min. read
          </h5>
        )}
      </div>
    </div>
  )
}
