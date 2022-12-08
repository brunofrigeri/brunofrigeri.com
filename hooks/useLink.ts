import { useCallback, useEffect, useState } from 'react'
import { NextRouter } from 'next/router'
import { mapENPostByPTBRLocale, mapPTBRPostByENLocale } from '../helpers'

type useLinkProps = {
  enHref: string
  ptBRHref: string
}

const useLink = (router: NextRouter): useLinkProps => {
  const { pathname, asPath } = router
  const [ptBRHref, setPtBRHref] = useState<string>('/pt-BR')
  const [enHref, setEnHref] = useState<string>('/')

  const getHrefByLocale = useCallback(
    (mapByLocale: { [key in string]: string }, slug: string) => {
      return mapByLocale[slug] ? `/blog/${mapByLocale[slug]}` : '/'
    },
    []
  )

  const buildHrefByLocale = useCallback(() => {
    if (pathname.includes('/blog/[slug]')) {
      const [, , slug] = asPath.split('/')

      setEnHref(getHrefByLocale(mapENPostByPTBRLocale, slug))
      setPtBRHref(getHrefByLocale(mapPTBRPostByENLocale, slug))
    }
  }, [pathname, asPath, getHrefByLocale])

  useEffect(() => {
    buildHrefByLocale()
  }, [router, buildHrefByLocale])

  return {
    enHref,
    ptBRHref,
  }
}

export { useLink }
export type { useLinkProps }
