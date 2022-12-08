import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en" className="font-custom">
        <Head>
          <link rel="icon" href="/assets/avatar.jpg" />
          <meta
            name="google-site-verification"
            content="2H60FxwYAVnCGNBHtl_e4D3MqIXSDc8YRgjhpfjxczg"
          />
        </Head>
        <body className="bg-white dark:bg-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
