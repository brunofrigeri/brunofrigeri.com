import type { ImageProps } from 'next/image'

enum Images {
  AVATAR = 'avatar',
  MOON = 'moon',
  SUN = 'sun',
  PRESENTATION_LIGHT = 'presentationLight',
  PRESENTATION_DARK = 'presentationDark',
  REACT = 'react',
  NODE = 'nodejs',
  APOLLO = 'apollo',
  JAVASCRIPT = 'js',
  TYPESCRIPT = 'ts',
  GATSBY = 'gatsby',
  NEXT = 'next',
  GRAPHQL = 'graphql',
  DARK_APOLLO = 'darkApollo',
  DARK_NEXT = 'darkNext',
  DARK_NODE = 'darkNode',
  DARK_GLOBALSYS = 'darkGlobalsys',
  GLOBALSYS = 'globalsys',
  G2I = 'g2i',
  MULTICAST = 'multicast',
  PAYTIME = 'paytime',
  SKILOPAY = 'skilopay',
  V1APP = 'v1app',
  BRAZIL = 'brazil',
  USA = 'usa',
}

type Image = Pick<ImageProps, 'src'>

const images: { [key in Images]: Image } = {
  [Images.AVATAR]: {
    src: '/assets/avatar.jpg',
  },
  [Images.MOON]: {
    src: '/assets/Moon.svg',
  },
  [Images.SUN]: {
    src: '/assets/Sun.svg',
  },
  [Images.PRESENTATION_LIGHT]: {
    src: '/assets/PresentationLight.svg',
  },
  [Images.PRESENTATION_DARK]: {
    src: '/assets/PresentationDark.svg',
  },
  [Images.JAVASCRIPT]: {
    src: '/assets/js.svg',
  },
  [Images.TYPESCRIPT]: {
    src: '/assets/ts.svg',
  },
  [Images.APOLLO]: {
    src: '/assets/apollo.svg',
  },
  [Images.GATSBY]: {
    src: '/assets/gatsby.svg',
  },
  [Images.GRAPHQL]: {
    src: '/assets/graphql.svg',
  },
  [Images.NEXT]: {
    src: '/assets/next.svg',
  },
  [Images.REACT]: {
    src: '/assets/react.svg',
  },
  [Images.NODE]: {
    src: '/assets/nodejs.svg',
  },
  [Images.DARK_APOLLO]: {
    src: '/assets/dark_apollo.svg',
  },
  [Images.DARK_NEXT]: {
    src: '/assets/dark_next.svg',
  },
  [Images.DARK_GLOBALSYS]: {
    src: '/assets/dark_globalsys.svg',
  },
  [Images.GLOBALSYS]: {
    src: '/assets/globalsys.svg',
  },
  [Images.G2I]: {
    src: '/assets/g2i.svg',
  },
  [Images.MULTICAST]: {
    src: '/assets/multicast.svg',
  },
  [Images.PAYTIME]: {
    src: '/assets/paytime.svg',
  },
  [Images.DARK_NODE]: {
    src: '/assets/dark_nodejs.svg',
  },
  [Images.SKILOPAY]: {
    src: '/assets/skilopay.svg',
  },
  [Images.V1APP]: {
    src: '/assets/v1app.svg',
  },
  [Images.BRAZIL]: {
    src: '/assets/brazil.svg',
  },
  [Images.USA]: {
    src: '/assets/usa.svg',
  },
}

export default images
