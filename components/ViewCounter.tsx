import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

interface ViewCounterProps {
  slug: string
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const { data } = useSWR(
    `/api/views/${slug}?locale=${locale}`,
    async (args) => {
      const res = await fetch(args)
      return res.json()
    }
  )

  const views = data?.total

  const LoadingViews = (
    <div className="h-px w-4 bg-descriptionLight dark:bg-descriptionDark mr-2" />
  )

  return (
    <div className="flex items-center justify-center">
      <h5 className="flex flex-row items-center justify-center text-descriptionLight dark:text-descriptionDark">
        {!data && LoadingViews}
        {t('views', { views })}
      </h5>
    </div>
  )
}
