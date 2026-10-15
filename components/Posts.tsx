import React from 'react'
import { useTranslation } from 'react-i18next'
import { Post as PostType } from '../lib/types'
import Post from './Post'

interface PostsProps {
  title: string
  posts?: PostType[]
}

export default function Posts({ title, posts = [] }: PostsProps) {
  const { t } = useTranslation('home')

  return (
    <div>
      <p className="m-0 mb-4 font-mono text-xs font-normal tracking-[0.08em] uppercase text-muted">
        {title}
      </p>
      {posts?.length ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {posts.map((post) => (
            <Post {...post} key={post.frontMatter.slug} />
          ))}
        </div>
      ) : (
        <p className="m-0 text-[17px] leading-[1.5] text-muted">
          {t('notfound')}
        </p>
      )}
    </div>
  )
}
