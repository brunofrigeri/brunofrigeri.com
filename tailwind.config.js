const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  important: true,
  theme: {
    colors: {
      transparent: 'transparent',
      highlight_light: '#1E3F66',
      highlight_dark: '#528AAE',
      description_light: '#626262',
      description_dark: '#DBDBDB',
      light_toggle: '#F6F6F6',
      dark_toggle: '#344159',
      search_light: '#CDCDCD',
      search_dark: '#EDEDED',
      current: 'currentColor',
      black: '#191919',
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: '#FB3D62',
      yellow: '#D1A24E',
      blue: '#7096FF',
      purple: '#B677E3',
      green: '#ABD56F',
      green_text: '#63A8A4',
      pink: colors.pink,
    },
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontWeight: 700, fontSize: theme('fontSize.3xl') },
        h2: { fontWeight: 600, fontSize: theme('fontSize.lg') },
        h3: { fontWeight: 500, fontSize: theme('fontSize.lg') },
        h4: { fontWeight: 300, fontSize: theme('fontSize.base') },
        h5: { fontWeight: 300, fontSize: theme('fontSize.sm') },
        p: { fontWeight: 300, fontSize: theme('fontSize.sm') },
        li: { fontWeight: 300, fontSize: theme('fontSize.sm') },
      })
    }),
  ],
}
