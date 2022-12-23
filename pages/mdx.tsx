import React, { useEffect, useState } from 'react'
import MDXTextArea from '../components/MDXTextArea'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { FrontMatter } from '../lib/types'
import { format } from 'date-fns'
import { FaPlus } from 'react-icons/fa'
import Head from 'next/head'
import octokit from '../lib/octokit'

const Mdx = () => {
  const [frontMatter, setFrontMatter] = useState<FrontMatter | undefined>(
    undefined
  )
  const [rawMdx, setRawMdx] = useState<string>('')
  const [compiledMdx, setCompiledMdx] = useState(null)

  const isDev = process.env.NODE_ENV === 'development'

  useEffect(() => {
    const compileToString = async () => {
      const source = await remark().use(remarkHtml).process(rawMdx)
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
      event_type: 'TEST_EVENT',
      client_payload: {
        frontMatter: {
          ...frontMatter,
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
      <div className="m-5">
        <div className="w-full grid grid-cols-2">
          <div className="mx-5">
            <div className="flex flex-col p-5 border border-black border-b-0">
              <input
                name="title"
                type="text"
                placeholder="New post title here..."
                className="text-black font-bold text-4xl"
                onChange={(event) =>
                  onFrontMatterChange('title', event.currentTarget.value)
                }
              />
              <input
                name="excerpt"
                type="text"
                placeholder="New post description here..."
                onChange={(event) =>
                  onFrontMatterChange('excerpt', event.currentTarget.value)
                }
              />
            </div>
            <MDXTextArea value={rawMdx} setValue={setRawMdx} />
          </div>
          {!!compiledMdx && (
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: compiledMdx }}
            />
          )}
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
