import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border pb-12 pt-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-2">
           <Link href="/" className="text-xl font-bold tracking-tight text-primary">
              {siteMetadata.title}
           </Link>
           <div className="flex space-x-2 text-sm text-muted-foreground">
             <div>{siteMetadata.author}</div>
             <div>{` • `}</div>
             <div>{`© ${new Date().getFullYear()}`}</div>
           </div>
        </div>

        <div className="flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
        </div>
      </div>
    </footer>
  )
}
