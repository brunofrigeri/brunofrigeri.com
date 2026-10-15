export const useFirebaseRTDB = () => {
  const increaseSlugView = (slug: string, locale: string) => {
    return fetch(`/api/views/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        locale: locale,
      }),
    }).then((res) => res.json() as Promise<{ total: number }>)
  }

  return {
    increaseSlugView,
  }
}
