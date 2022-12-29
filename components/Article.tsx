import React from 'react'
import { FrontMatter } from '../lib/types'
import Tags from './Tags'

interface ArticleProps {
  frontMatter: FrontMatter
  content: string
}

const Article: React.FC<ArticleProps> = ({ frontMatter, content }) => {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        {frontMatter?.title && (
          <h1 className="mt-6 text-black dark:text-white">
            {frontMatter.title}
          </h1>
        )}
        {frontMatter?.excerpt && (
          <p className="mt-6 text-black dark:text-white">
            {frontMatter.excerpt}
          </p>
        )}
        {frontMatter?.date && (
          <h4 className="my-6 text-descriptionLight dark:text-descriptionDark">
            {frontMatter.date}
          </h4>
        )}
        {frontMatter?.tags?.length > 0 && <Tags stacks={frontMatter.tags} />}
      </div>
      <article
        className="max-w-sm md:max-w-3xl prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}

export default Article
