import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-background justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="text-primary hidden h-6 text-2xl font-bold tracking-tight sm:block">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-foreground hover:text-accent m-1 font-medium transition-colors"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <Link
          href="/newsletter"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hidden rounded-full px-5 py-2 text-sm font-medium transition-colors sm:block"
        >
          اشتراک
        </Link>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
