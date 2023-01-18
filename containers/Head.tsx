import NextHead from 'next/head'
import { useRouter } from 'next/router'

interface HeadProps {
  title: string
  description: string
  image?: string
}

const Head = ({ title, description, image }: HeadProps) => {
  const router = useRouter()
  const canonicalRef = `https://brunofrigeri.com${router.asPath}`

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="canonical" href={canonicalRef} />
      <meta property="og:site_name" content="Bruno Frigeri" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {/* <meta property="og:locale" content={router.locale} /> */}
    </NextHead>
  )
}

export default Head
