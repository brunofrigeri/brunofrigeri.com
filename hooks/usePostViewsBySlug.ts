import { useCallback } from 'react'

export const usePostViewsBySlug = () => {
  const postView = useCallback((slug: string, locale: string) => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        locale: locale,
      }),
    })
  }, [])

  return {
    postView,
  }
}
