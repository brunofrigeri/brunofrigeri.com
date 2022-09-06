import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback } from 'react'
import Tags from './Tags'
import ViewCounter from './ViewCounter'

interface PostProps {
  slug: string
  title?: string
  reading_time?: string
  excerpt?: string
  date?: string
  stacks?: Array<string>
  featured_image?: string
  locale: string
}

export default function Post({
  slug,
  title,
  excerpt,
  date,
  reading_time,
}: PostProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="flex flex-row my-8">
        <div className="mx-6">
          {title && <h3 className="text-black dark:text-white">{title}</h3>}
          {excerpt && (
            <h4 className="my-1 text-description_light dark:text-description_dark">
              {excerpt}
            </h4>
          )}
          <div className="flex flex-row justify-between items-center my-4">
            <div className="flex flex-row">
              {date && (
                <h5 className="text-description_light dark:text-description_dark">
                  {date}
                </h5>
              )}
              <h5 className="text-description_light dark:text-description_dark">
                &nbsp;&nbsp;|&nbsp;&nbsp;
              </h5>
              {reading_time && (
                <h5 className="text-description_light dark:text-description_dark">
                  {reading_time}
                </h5>
              )}
              <h5 className="text-description_light dark:text-description_dark">
                &nbsp;&nbsp;|&nbsp;&nbsp;
              </h5>
              <ViewCounter slug={slug} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
