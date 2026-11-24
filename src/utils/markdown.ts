// Strips common Markdown syntax to produce a plain-text excerpt for cards.
export function excerptFromMarkdown(body: string | null, max = 180): string {
  if (!body) return ''
  let text = body
  // remove code fences
  text = text.replace(/```[\s\S]*?```/g, ' ')
  // remove inline code
  text = text.replace(/`[^`]*`/g, ' ')
  // remove images
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  // remove links, keep label
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  // remove headings markers
  text = text.replace(/^#{1,6}\s+/gm, '')
  // remove bold/italic markers
  text = text.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
  // remove blockquote markers
  text = text.replace(/^>\s?/gm, '')
  // remove horizontal rules
  text = text.replace(/^[-*_]{3,}\s*$/gm, ' ')
  // collapse whitespace
  text = text.replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  // cut on word boundary
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut) + '…'
}