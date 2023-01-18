export const useFirebaseRTDB = () => {
  const increaseSlugView = (slug: string, locale: string) => {
    fetch(`/api/views/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        locale: locale,
      }),
    })
  }

  return {
    increaseSlugView,
  }
}
