import React from 'react'

interface PostProps {
  slug: string
  title?: string
  reading_time?: string
  excerpt?: string
  date?: string
  search?: string
}

export default function Post({
  slug,
  title,
  excerpt,
  date,
  reading_time,
  search,
}: PostProps) {
  return (
    <a href={`/blog/${slug}`}>
      <div className="my-8">
        {title && (
          <h3 className="md:text-lg text-black dark:text-white">{title}</h3>
        )}
        {excerpt && (
          <h5 className="md:text-sm my-1 text-description_light dark:text-description_dark">
            {excerpt}
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
          {reading_time && (
            <h5 className="text-xs text-description_light dark:text-description_dark">
              {reading_time}
            </h5>
          )}
        </div>
      </div>
    </a>
  )
}
