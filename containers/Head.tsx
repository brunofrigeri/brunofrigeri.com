import NextHead from "next/head";
import { useRouter } from "next/router";
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_SIZE,
  SITE_NAME,
  absoluteUrl,
} from "../constants/site";

type JsonLd = Record<string, unknown>;

interface HeadProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
}

const Head = ({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  tags = [],
  noindex = false,
  jsonLd,
}: HeadProps) => {
  const router = useRouter();
  // Canonical ignores query strings and hashes so tracking params don't
  // create duplicate URLs.
  const pathname = router.asPath.split(/[?#]/)[0];
  const url = absoluteUrl(pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(OG_IMAGE_SIZE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE_SIZE.height)} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content={SITE_NAME} />
      )}
      {type === "article" &&
        tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </NextHead>
  );
};

export default Head;
