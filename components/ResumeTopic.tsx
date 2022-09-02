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
            <h3 className="text-primary_light dark:text-primary_dark">
              {title}
            </h3>
          )}
          {subTitle && (
            <h4 className="py-2 text-description_light dark:text-description_dark">
              {subTitle}
            </h4>
          )}
          <Tags stacks={tech} />
        </div>
        <div className="flex flex-col">
          {location && (
            <p className="self-end text-xs md:text-sm font-semibold text-primary_light dark:text-primary_dark">
              {location}
            </p>
          )}
          <div className="flex flex-row py-2">
            {dateInit && (
              <p className="italic text-xs md:text-xs text-description_light dark:text-description_dark">
                {dateInit} -&nbsp;
              </p>
            )}
            <p className="italic text-xs md:text-xs text-description_light dark:text-description_dark">
              {dateEnd ? dateEnd : ' CURRENT'}
            </p>
          </div>
        </div>
      </div>
      {description && (
        <ul>
          {description.map((d) => (
            <li className="text-xs md:text-sm list-disc list-inside text-description_light dark:text-description_dark">
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
