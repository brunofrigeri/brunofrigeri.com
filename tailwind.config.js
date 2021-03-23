const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    colors: {
      transparent: 'transparent',
      highlight_light: '#69C6ED',
      highlight_dark: '#7D95C2',
      description_light: '#626262',
      description_dark: '#DBDBDB',
      light_toggle: "#F6F6F6",
      dark_toggle: '#344159',
      search_light: '#AAAAAA',
      search_dark: '#EDEDED',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontFamily: 'Inter', fontWeight: 800, fontSize: theme('fontSize.2xl')},
        'h2': { fontFamily: 'Inter', fontWeight: 600, fontSize: theme('fontSize.lg')},
        'h3': { fontFamily: 'Inter', fontWeight: 500, fontSize: theme('fontSize.base')},
        'h4': { fontFamily: 'Inter', fontWeight: 300, fontSize: theme('fontSize.sm')},
        'h5': { fontFamily: 'Inter', fontWeight: 300, fontSize: theme('fontSize.xs')},
        'p': { fontFamily: 'Inter', fontWeight: 300, fontSize: theme('fontSize.sm')},
      })
    }),
  ]
}
