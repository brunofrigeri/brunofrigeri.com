import Link from 'next/link'
import React from 'react'
import { Post as PostType } from '../lib/types'
import ViewCounter from './ViewCounter'

export default function Post({
  frontMatter: { slug, title, excerpt, date },
  readingTime,
}: PostType) {
  return (
    <Link href={`/blog/${slug}`} className="flex flex-row my-8">
      <div className="mx-6">
        {title && <h3 className="text-black dark:text-white">{title}</h3>}
        {excerpt && (
          <h4 className="my-1 text-descriptionLight dark:text-descriptionDark">
            {excerpt}
          </h4>
        )}
        <div className="flex flex-row justify-between items-center my-4">
          <div className="flex flex-row">
            {date && (
              <h5 className="text-descriptionLight dark:text-descriptionDark">
                {date}
              </h5>
            )}
            <h5 className="text-descriptionLight dark:text-descriptionDark">
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </h5>
            {readingTime && (
              <h5 className="text-descriptionLight dark:text-descriptionDark">
                {readingTime.text}
              </h5>
            )}
            <h5 className="text-descriptionLight dark:text-descriptionDark">
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </h5>
            <ViewCounter slug={slug} />
          </div>
        </div>
      </div>
    </Link>
  )
}
