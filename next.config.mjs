import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'
import mdx from '@next/mdx'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkHtml, remarkPrism],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX({
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
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-BR'],
  },
})
