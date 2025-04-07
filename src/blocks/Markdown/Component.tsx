import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGFM from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Markdown from 'react-markdown'

export type MarkdownProps = {
  content: string,
}

export const MarkdownBlock: React.FC<MarkdownProps> = ({ content }) => {
  return <Markdown
    remarkPlugins={[remarkMath, remarkGFM]}
    rehypePlugins={[rehypeKatex, rehypeRaw]}
  >
    {content}
  </Markdown>
}
