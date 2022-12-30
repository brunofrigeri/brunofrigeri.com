import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Container from '../containers/Container'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { Project } from '../lib/types'

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Automatized Blog Post with Markdown Editor',
      description:
        'This project was created with the intent of having an easy way to create blog posts and add to my blog repository, without the need of writing in third party editors.',
      href: '/mdx',
    },
    {
      title: 'Test Coverage Dashboard',
      description: 'This project was created!',
      href: '',
    },
  ]

  return (
    <Container>
      <div className="flex flex-col">
        <h1 className="text-black dark:text-white">Projects</h1>

        <div className="grid md:grid-cols-2 grid-cols-1 my-4">
          {projects?.map((project, index) => {
            const isLast = index === projects.length - 1

            return (
              <Link
                key={project.title}
                href={project.href}
                className={`group flex flex-col justify-between border rounded-lg p-4 hover:border-primaryLight dark:hover:border-primaryDark ${
                  !isLast ? 'md:mr-4 md:mb-0 mb-4' : ''
                }`}
              >
                <div>
                  <h2 className="dark:text-white text-black group-hover:text-primaryLight dark:group-hover:text-primaryDark">
                    {project.title}
                  </h2>
                  <p className="my-4 dark:text-white text-black">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <a className="mr-2 group-hover:mr-4 font-medium dark:text-white text-black">
                    Read more
                  </a>
                  <FaArrowRight
                    className="dark:text-white text-black group-hover:text-primaryLight dark:group-hover:text-primaryDark group-hover:animate-bounceHorizontal"
                    size={14}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Projects
