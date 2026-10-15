import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="font-custom">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=DM+Mono:wght@400;500&display=swap"
        />
        <link rel="icon" href="/assets/UPDATED_PHOTO.jpg" />
        <meta
          name="google-site-verification"
          content="2H60FxwYAVnCGNBHtl_e4D3MqIXSDc8YRgjhpfjxczg"
        />
      </Head>
      <body className="bg-paper text-ink">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
