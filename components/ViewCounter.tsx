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

  return (
    <div className="flex items-center gap-3">
      <span className="bg-accent text-onAccent px-3 py-0.5 text-[28px] font-bold tracking-[-0.03em] leading-[1.15]">
        {typeof views === 'number' ? views.toLocaleString(locale) : '–'}
      </span>
      <span className="font-mono text-[13px] font-medium tracking-[0.08em] uppercase">
        {t('viewsLabel')}
      </span>
    </div>
  )
}
