import useSWR from 'swr'

interface ViewCounterProps {
  slug: string
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const { data } = useSWR(`/api/views/${slug}`, async (args) => {
    const res = await fetch(args)
    return res.json()
  })

  const views = data?.total

  const LoadingViews = (
    <div className="h-px w-4 bg-description_light dark:bg-description_dark mr-2" />
  )

  return (
    <div className="flex items-center justify-center">
      <h5 className="flex flex-row items-center justify-center text-description_light dark:text-description_dark">
        {!data && LoadingViews}
        {`${views ?? ''} views`}
      </h5>
    </div>
  )
}
