const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  important: true,
  theme: {
    colors: {
      transparent: 'transparent',
      primaryLight: '#1E3F66',
      primaryDark: '#528AAE',
      descriptionLight: '#626262',
      descriptionDark: '#DBDBDB',
      toggleLight: '#F6F6F6',
      toggleDark: '#344159',
      searchLight: '#808080',
      searchDark: '#EDEDED',
      greenToken: '#63A8A4',
      textCodeColor: '#657B83',
      current: 'currentColor',
      black: '#333333',
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: '#FB3D62',
      yellow: '#D1A24E',
      blue: '#7096FF',
      purple: '#B677E3',
      green: '#ABD56F',
      pink: colors.pink,
    },
    extend: {
      fontFamily: {
        custom: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        bounceHorizontal: {
          '0%, 100%': {
            transform: 'translate(-50%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translate(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        bounceHorizontal: 'bounceHorizontal 1s infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontWeight: 700,
          fontSize: theme('fontSize.4xl'),
        },
        h2: {
          fontWeight: 600,
          fontSize: theme('fontSize.xl'),
        },
        h3: {
          fontWeight: 500,
          fontSize: theme('fontSize.xl'),
        },
        h4: {
          fontWeight: 300,
          fontSize: theme('fontSize.lg'),
        },
        h5: {
          fontWeight: 300,
          fontSize: theme('fontSize.tiny'),
        },
        p: {
          fontWeight: 300,
          fontSize: theme('fontSize.tiny'),
        },
        li: {
          fontWeight: 300,
          fontSize: theme('fontSize.tiny'),
        },
      })
    }),
  ],
  corePlugins: {
    fontFamily: true,
  },
}
