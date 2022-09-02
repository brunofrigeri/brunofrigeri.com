import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkHtml, { sanitize: false, quoteSmart: true })
    .use(remarkPrism)
    .process(markdown)

  return result.toString()
}
