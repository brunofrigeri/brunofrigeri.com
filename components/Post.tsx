import Link from 'next/link'
import React from 'react'
import { Post as PostType } from '../lib/types'
import ViewCounter from './ViewCounter'

export default function Post({
  frontMatter: { slug, title, excerpt, date },
  readingTime,
}: PostType) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col gap-4 min-h-[400px] box-border border border-ink px-5 pt-6 pb-5 md:px-6 md:pt-7 md:pb-6 transition-colors duration-200 md:hover:bg-ink md:hover:text-paper"
    >
      {title && (
        <h3 className="m-0 font-bold text-[26px] md:text-[clamp(24px,2.2vw,30px)] leading-[1.12] tracking-[-0.025em] [text-wrap:balance]">
          {title}
        </h3>
      )}
      {excerpt && (
        <p className="m-0 text-base font-normal leading-[1.5] text-muted md:group-hover:text-cardMuted [text-wrap:pretty]">
          {excerpt}
        </p>
      )}
      <div className="mt-auto flex flex-col gap-4 pt-2">
        <ViewCounter slug={slug} />
        <div className="border-t border-current pt-3.5 flex justify-between gap-3 font-mono text-[13px] font-normal text-muted md:group-hover:text-cardMuted">
          <span>{date}</span>
          <span>{readingTime?.text}</span>
        </div>
      </div>
    </Link>
  )
}
