import React from 'react'
import Button from './Button'
import Post from './Post'

interface PostsProps {
  title: string
}

export default function Posts({ title, ...props }: PostsProps) {
  const posts: Array<{
    title?: string
    description?: string
    date?: string
    minutesOfRead?: number
  }> = [
    {
      title: "React Native Performance: Do and Don't",
      description:
        'Performance is a topic with major ramifications for using a framework like React Native in real-world mobile applications.',
      date: '03/16/2021',
      minutesOfRead: 6,
    },
    {
      title:
        'Give your code coverage sense or how to write unit tests for what matters',
      description:
        'Let’s talk about unit testing of frontend applications and let’s discover together why code coverage can lead to a false feeling that your unit tests are good enough in terms of tested functionality. This will not be about the quality of test code or anything like that. It will be a discussion about psychological switch in a way how we write our unit tests.',
      date: '03/16/2021',
      minutesOfRead: 12,
    },
    {
      title: "React Native Performance: Do and Don't",
      description:
        'Performance is a topic with major ramifications for using a framework like React Native in real-world mobile applications.',
      date: '03/16/2021',
      minutesOfRead: 6,
    },
  ]

  return (
    <div className="my-8">
      <div className="flex flex-row justify-between">
        <h2 className="md:text-xl text-black dark:text-white">{title}</h2>
        <Button type="bordered">See all.</Button>
      </div>
      {posts?.length &&
        posts.map((post, index) => <Post key={index} {...post} />)}
    </div>
  )
}
