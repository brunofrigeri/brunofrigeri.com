import React, { useEffect, useState } from 'react'
import MDXTextArea from '../components/MDXTextArea'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { FrontMatter } from '../lib/types'
import { format } from 'date-fns'
import { FaPlus } from 'react-icons/fa'

const Mdx = () => {
  const [frontMatter, setFrontMatter] = useState<FrontMatter | undefined>(
    undefined
  )
  const [rawMdx, setRawMdx] = useState<string>('')
  const [compiledMdx, setCompiledMdx] = useState(null)

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

  const onPublish = () => {
    console.log({
      ...frontMatter,
      date: format(new Date(), 'MM/dd/yyyy'),
      author: 'Bruno Frigeri',
      locale: 'en',
    })
  }

  return (
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
      <button
        onClick={onPublish}
        className="bg-primaryLight dark:bg-primaryDark fixed rounded-full p-4 right-5 bottom-5"
      >
        <FaPlus size={20} color="white" />
      </button>
    </div>
  )
}

export default Mdx
