import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-accent/10 text-accent hover:bg-accent/20 mr-2 mb-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider uppercase transition-colors"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
