import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkHtml, { sanitize: false, quoteSmart: true })
    .use(remarkPrism)
    .process(markdown)

  // Bold-led "Ps:" notes become callouts (styled in globals.css).
  return result
    .toString()
    .replace(/<p>(<strong>\s*(?:ps|ios)\b)/gi, '<p class="callout">$1')
}
