const { i18n } = require('./next-i18next.config')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

module.exports = withMDX({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/about',
          destination: '/about',
          locale: false,
        },
        {
          source: '/pt-BR/about',
          destination: '/pt-BR/about',
          locale: false,
        },
      ],
    }
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['cdn.jsdelivr.net'],
  },
  i18n,
})
