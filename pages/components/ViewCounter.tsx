import useSWR from 'swr'

interface ViewCounterProps {
  slug: string
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const { data } = useSWR(`/api/views/${slug}`, async (...args) => {
    const res = await fetch(args)
    return res.json()
  })
  const views = data?.total

  return views ? (
    <h5 className="text-xs text-description_light dark:text-description_dark">{`${views} views`}</h5>
  ) : null
}
