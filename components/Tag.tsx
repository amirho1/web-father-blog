import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent uppercase tracking-wider hover:bg-accent/20 transition-colors mr-2 mb-2"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
