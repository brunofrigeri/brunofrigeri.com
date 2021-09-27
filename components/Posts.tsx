import React from 'react'
import { useTranslation } from 'react-i18next'
import { Post as PostType } from '../../lib/posts'
import Button from './Button'
import Post from './Post'

interface PostsProps {
  title: string
  hasButton?: boolean
  posts: Array<PostType>
  onSeeAllPress?(): void
}

export default function Posts({
  title,
  hasButton = true,
  posts = [],
  onSeeAllPress = () => {},
  ...props
}: PostsProps) {
  const { t } = useTranslation('home')

  return (
    <div className="my-8">
      <div className="flex flex-row justify-between">
        <h2 className="md:text-xl text-black dark:text-white">{title}</h2>
        {hasButton && (
          <Button onClick={onSeeAllPress} type="bordered">
            {t('all')}
          </Button>
        )}
      </div>
      {posts?.length ? (
        posts.map((post, index) => (
          <Post {...post} key={index} reading_time={post.reading_time.text} />
        ))
      ) : (
        <h4 className="my-2 mb-8 text-description_light dark:text-description_dark">
          {t('notfound')}
        </h4>
      )}
    </div>
  )
}
