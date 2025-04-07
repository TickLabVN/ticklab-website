import type { Block } from 'payload'

export const Markdown: Block = {
  slug: 'markdown',
  interfaceName: 'MarkdownBlock',
  fields: [
    {
      name: 'content',
      type: 'textarea',
      label: false,
      required: true,
    },
  ],
}
  