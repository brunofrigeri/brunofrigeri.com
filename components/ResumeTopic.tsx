import React from 'react'
import Tags from './Tags'

interface ResumeTopicProps {
  title?: string
  subTitle?: string
  description?: Array<string>
  tech?: Array<string>
  location: string
  dateInit: string
  dateEnd?: string
}

export default function ResumeTopic({
  title,
  subTitle,
  description,
  location,
  dateInit,
  dateEnd,
  tech,
}: ResumeTopicProps) {
  return (
    <div>
      <div className="flex flex-row justify-between my-4">
        <div>
          {title && (
            <h3 className="text-primaryLight dark:text-primaryDark">{title}</h3>
          )}
          {subTitle && (
            <h4 className="py-2 text-descriptionLight dark:text-descriptionDark">
              {subTitle}
            </h4>
          )}
          <Tags stacks={tech} />
        </div>
        <div className="flex flex-col">
          {location && (
            <p className="self-end text-xs md:text-sm font-semibold text-primaryLight dark:text-primaryDark">
              {location}
            </p>
          )}
          <div className="flex flex-row py-2">
            {dateInit && (
              <p className="italic text-xs md:text-xs text-descriptionLight dark:text-descriptionDark">
                {dateInit} -&nbsp;
              </p>
            )}
            <p className="italic text-xs md:text-xs text-descriptionLight dark:text-descriptionDark">
              {dateEnd ? dateEnd : ' CURRENT'}
            </p>
          </div>
        </div>
      </div>
      {description && (
        <ul>
          {description.map((d) => (
            <li
              key={d}
              className="text-xs md:text-sm list-disc list-inside text-descriptionLight dark:text-descriptionDark"
            >
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
