import type { ImageProps } from 'next/image'

enum Images {
  AVATAR = 'avatar',
}

type Image = Pick<ImageProps, 'src'>

const images: { [key in Images]: Image } = {
  [Images.AVATAR]: {
    src: '/assets/avatar.jpg',
  },
}

export default images
