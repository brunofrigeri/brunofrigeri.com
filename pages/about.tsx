import React, { useMemo } from 'react'
import Container from '../containers/Container'
import { useTheme } from 'next-themes'
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
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { Config } from 'tailwindcss/types/config'

export default function About() {
  const { theme } = useTheme()
  const fullConfig = resolveConfig(tailwindConfig as Config)

  const iconColor = useMemo(
    () =>
      theme === 'light'
        ? fullConfig.theme.colors['toggleDark']
        : fullConfig.theme.colors['toggleLight'],
    [theme, fullConfig]
  )

  const skills: Array<React.ReactElement> = [
    <FaReact key="react" size={50} color={iconColor} />,
    <FaNode key="node" size={50} color={iconColor} />,
    <SiTypescript key="ts" size={50} color={iconColor} />,
    <SiJavascript key="js" size={50} color={iconColor} />,
    <SiNextdotjs key="next" size={50} color={iconColor} />,
    <SiApollographql key="apollo" size={50} color={iconColor} />,
    <SiGraphql key="graphql" size={50} color={iconColor} />,
    <SiGatsby key="gatsby" size={50} color={iconColor} />,
  ]

  const onEmailSentPress = () => {
    const email = 'bpiraja97@gmail.com'

    window.location.href = `mailto:${email}`
  }

  const { t } = useTranslation('about')

  return (
    <Container meta_description={t('intro-description')}>
      <div>
        <div>
          <h1 className="text-black dark:text-white">{t('introduction')}</h1>
          <h2 className="font-light my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
            {t('intro-description')}
          </h2>
          <Button
            target={'_blank'}
            rel={'noreferrer noopener'}
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
          <Button href={'/cv.pdf'} target={'_blank'} type={'bordered'}>
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
