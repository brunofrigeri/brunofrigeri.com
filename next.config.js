const withMDX = require("@next/mdx")();
const { i18n } = require('./next-i18next.config')

module.exports = withMDX({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  i18n,
});