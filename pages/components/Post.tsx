import Image from 'next/image'
import React from 'react'
import ViewCounter from './ViewCounter'

interface PostProps {
  slug: string
  title?: string
  reading_time?: string
  excerpt?: string
  date?: string
  featured_image?: string
}

export default function Post({
  slug,
  title,
  excerpt,
  date,
  reading_time,
  featured_image,
}: PostProps) {
  const onPostPress = () => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
    })
  }

  return (
    <a
      href={`/blog/${slug}`}
      onClick={onPostPress}
      className="flex flex-row my-8"
    >
      <div className="mx-6">
        {title && (
          <h3 className="md:text-lg text-black dark:text-white">{title}</h3>
        )}
        {excerpt && (
          <h5 className="md:text-sm my-1 text-description_light dark:text-description_dark">
            {excerpt}
          </h5>
        )}
        <div className="flex flex-row justify-between items-center my-4">
          <div className="flex flex-row">
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
          <ViewCounter slug={slug} />
        </div>
      </div>
      <Image
        alt={'thumbnail'}
        className="rounded-r-lg"
        src={featured_image}
        width={300}
        height={100}
      />
    </a>
  )
}
