import React from 'react'
import Container from '../containers/Container'
import Button from '../components/Button'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaReact, FaNode } from 'react-icons/fa'
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiApollographql,
  SiGraphql,
  SiGatsby,
} from 'react-icons/si'
import Head from '../containers/Head'

export default function About() {
  const skillsClassName = 'text-toggleDark dark:text-toggleLight'

  const skills: Array<React.ReactElement> = [
    <FaReact key="react" size={50} className={skillsClassName} />,
    <FaNode key="node" size={50} className={skillsClassName} />,
    <SiTypescript key="ts" size={50} className={skillsClassName} />,
    <SiJavascript key="js" size={50} className={skillsClassName} />,
    <SiNextdotjs key="next" size={50} className={skillsClassName} />,
    <SiApollographql key="apollo" size={50} className={skillsClassName} />,
    <SiGraphql key="graphql" size={50} className={skillsClassName} />,
    <SiGatsby key="gatsby" size={50} className={skillsClassName} />,
  ]

  const onEmailSentPress = () => {
    const email = 'bpiraja97@gmail.com'

    window.location.href = `mailto:${email}`
  }

  const { t } = useTranslation('about')

  return (
    <Container>
      <Head title="Bruno Frigeri" description={t('intro-description')} />
      <div>
        <div>
          <h1 className="text-black dark:text-white">{t('introduction')}</h1>
          <h2 className="font-light my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
            {t('intro-description')}
          </h2>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            onClick={onEmailSentPress}
          >
            {t('schedule')}
          </Button>
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">{t('skills')}</h1>
          {skills?.length && (
            <div className="py-6 grid grid-flow-col grid-rows-2 gap-4 md:grid-flow-col md:grid-rows-1">
              {skills.map((skill) => (
                <div key={skill.key}>{skill}</div>
              ))}
            </div>
          )}
        </div>
        <div className="py-8">
          <h1 className="text-black dark:text-white">{t('resume-title')}</h1>
          <h2 className="font-light my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
            {t('experiences')}
          </h2>
          <Button href="/cv.pdf" target="_blank" type="bordered">
            {t('resume')}
          </Button>
        </div>
      </div>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  }
}
