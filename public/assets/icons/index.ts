import type { ImageProps } from 'next/image'

enum Icons {
  SEARCH_ICON = 'searchIcon',
  PROFILE_ICON = 'profileIcon',
  LOCK_ICON = 'lockIcon',
}

type Icon = Pick<ImageProps, 'src'>

const icons: { [key in Icons]: Icon } = {
  [Icons.SEARCH_ICON]: {
    src: '/assets/icons/SearchIcon.svg',
  },
  [Icons.PROFILE_ICON]: {
    src: '/assets/icons/Profile.svg',
  },
  [Icons.LOCK_ICON]: {
    src: '/assets/icons/Lock.svg',
  },
}

export default icons
