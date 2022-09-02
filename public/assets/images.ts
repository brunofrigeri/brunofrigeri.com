import type { ImageProps } from 'next/image'

enum Images {
  AVATAR = 'avatar',
  BRAZIL = 'brazil',
  USA = 'usa',
}

type Image = Pick<ImageProps, 'src'>

const images: { [key in Images]: Image } = {
  [Images.AVATAR]: {
    src: '/assets/avatar.jpg',
  },
  [Images.BRAZIL]: {
    src: '/assets/brazil.svg',
  },
  [Images.USA]: {
    src: '/assets/usa.svg',
  },
}

export default images
