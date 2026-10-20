import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "../constants/site";

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Senior Software Engineer",
  worksFor: { "@type": "Organization", name: "Coinbase" },
  knowsAbout: ["React", "React Native", "TypeScript", "Frontend architecture", "AI agents"],
};

export const homeJsonLd = () => [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
  },
  { "@context": "https://schema.org", ...person },
];

export const aboutJsonLd = (description: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: absoluteUrl("/about"),
  name: `About – ${SITE_NAME}`,
  description,
  mainEntity: person,
});

interface BlogPostingInput {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  image: string;
  tags?: string[];
}

export const blogPostingJsonLd = ({
  slug,
  title,
  description,
  datePublished,
  image,
  tags = [],
}: BlogPostingInput) => [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    headline: title,
    description,
    image: absoluteUrl(image),
    datePublished,
    dateModified: datePublished,
    inLanguage: "en",
    keywords: tags.join(", "),
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE_URL}/#writing` },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(`/blog/${slug}`) },
    ],
  },
];
