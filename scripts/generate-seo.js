// Generates public/sitemap.xml and public/rss.xml from the posts folder.
// Runs before `next dev` / `next build` (see package.json), so both files are
// plain static assets and never depend on reading files at runtime.
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://www.brunofrigeri.com";
const SITE_NAME = "Bruno Frigeri";
const postsDir = path.join(process.cwd(), "posts");
const publicDir = path.join(process.cwd(), "public");

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const posts = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
    return { slug: file.replace(/\.mdx$/, ""), ...data, date: new Date(data.date) };
  })
  .filter((post) => post.locale === "en" && !post.draft)
  .sort((a, b) => b.date - a.date);

const iso = (date) => date.toISOString().split("T")[0];
const newest = posts.length ? posts[0].date : new Date();

const pages = [
  { loc: SITE_URL, lastmod: newest, priority: "1.0" },
  { loc: `${SITE_URL}/about`, lastmod: newest, priority: "0.7" },
  ...posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.date,
    priority: "0.8",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${iso(page.lastmod)}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} – Writing</title>
    <link>${SITE_URL}</link>
    <description>Notes on React Native, frontend architecture, AI agents and the lessons I pick up along the way.</description>
    <language>en</language>
    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${(post.stacks || [])
  .map((tag) => `      <category>${escapeXml(tag)}</category>`)
  .join("\n")}
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);
console.log(`SEO files generated for ${posts.length} posts`);
