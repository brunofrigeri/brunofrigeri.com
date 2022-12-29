import React from 'react'
import { useTranslation } from 'react-i18next'
import { Post as PostType } from '../lib/types'
import Button from './Button'
import Post from './Post'

interface PostsProps {
  title: string
  hasButton?: boolean
  posts?: PostType[]
  onSeeAllPress?(): void
}

export default function Posts({
  title,
  hasButton = true,
  posts = [],
  onSeeAllPress = () => {},
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
        posts.map((post) => {
          return <Post {...post} key={post.frontMatter.slug} />
        })
      ) : (
        <h4 className="my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
          {t('notfound')}
        </h4>
      )}
    </div>
  )
}
