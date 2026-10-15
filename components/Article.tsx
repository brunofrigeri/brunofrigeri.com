import React from 'react'
import { FrontMatter, ReadTimeResults } from '../lib/types'
import Tags from './Tags'
import ViewCounter from './ViewCounter'

interface ArticleProps {
  frontMatter: FrontMatter
  content: string
  readingTime?: ReadTimeResults
}

const Article: React.FC<ArticleProps> = ({
  frontMatter,
  content,
  readingTime,
}) => {
  return (
    <article>
      <div className="border-t-[3px] border-ink pt-10 md:pt-[clamp(40px,5vw,72px)] pb-9 md:pb-[clamp(40px,5vw,64px)] flex flex-col gap-6 md:gap-7">
        {frontMatter?.tags?.length > 0 && <Tags stacks={frontMatter.tags} />}
        {frontMatter?.title && (
          <h1 className="m-0 max-w-[1100px] font-bold text-[40px] md:text-[clamp(40px,6.6vw,96px)] leading-none md:leading-[0.98] tracking-[-0.04em] [text-wrap:balance]">
            {frontMatter.title}
          </h1>
        )}
        {frontMatter?.excerpt && (
          <p className="m-0 max-w-[720px] text-[21px] md:text-[clamp(20px,2vw,26px)] leading-[1.35] font-normal tracking-[-0.01em] [text-wrap:pretty]">
            {frontMatter.excerpt}
          </p>
        )}
        <div className="border-t border-ink pt-4 md:pt-[18px] flex flex-col md:flex-row md:flex-wrap md:items-center gap-3 md:gap-x-10 md:gap-y-4">
          <ViewCounter slug={frontMatter.slug} />
          <div className="flex flex-wrap gap-x-6 md:gap-x-10 gap-y-2 font-mono text-sm font-normal text-muted">
            {frontMatter?.date && <span>{frontMatter.date}</span>}
            {readingTime?.text && <span>{readingTime.text}</span>}
          </div>
        </div>
      </div>
      <div
        className="post-body pb-14 md:pb-[clamp(56px,8vw,112px)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}

export default Article
