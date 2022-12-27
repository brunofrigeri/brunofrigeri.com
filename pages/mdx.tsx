import React, { useEffect, useState } from 'react'
import MDXTextArea from '../components/MDXTextArea'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { FrontMatter } from '../lib/types'
import { format } from 'date-fns'
import { FaPlus } from 'react-icons/fa'
import Head from 'next/head'
import octokit from '../lib/octokit'
import { slugify } from '../helpers/slugify'
import ResizableTextArea from '../components/ResizableTextArea'

const Mdx = () => {
  const [frontMatter, setFrontMatter] = useState<FrontMatter | undefined>(
    undefined
  )
  const [rawMdx, setRawMdx] = useState<string>('')
  const [, setCompiledMdx] = useState(null)

  const isDev = process.env.NODE_ENV === 'development'

  useEffect(() => {
    const compileToString = async () => {
      const source = await remark()
        .use(remarkHtml, { sanitize: false, quoteSmart: true })
        .process(rawMdx)
      setCompiledMdx(source)
    }

    compileToString()
  }, [rawMdx])

  const onFrontMatterChange = (objectKey: keyof FrontMatter, value: string) => {
    setFrontMatter((prevFrontMatter) => ({
      ...prevFrontMatter,
      [objectKey]: value,
    }))
  }

  const onPublish = async () => {
    await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
      owner: 'brunofrigeri',
      repo: 'brunofrigeri.com',
      event_type: 'CREATE_POST',
      client_payload: {
        frontMatter: {
          ...frontMatter,
          slug: slugify(frontMatter.title),
          date: format(new Date(), 'MM/dd/yyyy'),
          author: 'Bruno Frigeri',
          locale: 'en',
        },
        mdx: rawMdx,
      },
    })
  }

  return (
    <>
      <Head>
        <title>Bruno Frigeri - MDX Editor</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={'website'} />
        <meta property="og:site_name" content="Bruno Frigeri" />
        <meta property="og:description" content="MDX Editor" />
        <meta property="og:title" content="MDX Editor" />
        <meta property="og:image" />
      </Head>
      <div className="flex justify-center min-h-screen">
        <div className="flex flex-col m-5 w-1/2">
          <div className="flex-initial flex flex-col border-black dark:border-white border border-b-0 mt-5">
            <ResizableTextArea
              value={frontMatter?.title}
              placeholder="New post title here..."
              className="dark:text-white text-black font-bold text-4xl p-5"
              setValue={(value) => onFrontMatterChange('title', value)}
            />
            <ResizableTextArea
              value={frontMatter?.excerpt}
              placeholder="New post description here..."
              className="dark:text-white text-black px-5 pt-1 pb-5 resize-none"
              setValue={(value) => onFrontMatterChange('excerpt', value)}
            />
          </div>
          <MDXTextArea value={rawMdx} setValue={setRawMdx} />
          {/* {!!compiledMdx && (
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: compiledMdx }}
            />
          )} */}
        </div>
        {isDev && (
          <button
            onClick={onPublish}
            className="bg-primaryLight dark:bg-primaryDark fixed rounded-full p-4 right-5 bottom-5"
          >
            <FaPlus size={20} color="white" />
          </button>
        )}
      </div>
    </>
  )
}

export default Mdx
