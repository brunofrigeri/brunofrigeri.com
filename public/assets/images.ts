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
  [Images.DARK_NODE]: {
    src: '/assets/dark_nodejs.svg',
  },
  [Images.BRAZIL]: {
    src: '/assets/brazil.svg',
  },
  [Images.USA]: {
    src: '/assets/usa.svg',
  },
}

export default images
