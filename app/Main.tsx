import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'

const MAX_DISPLAY = 7 // 1 hero + 6 grid

export default function Home({ posts }) {
  const heroPost = posts.length > 0 ? posts[0] : null
  const gridPosts = posts.slice(1, MAX_DISPLAY)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {heroPost && (
        <section className="relative overflow-hidden rounded-[var(--radius)] bg-card border border-border shadow-sm p-6 sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {heroPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                <Link href={`/blog/${heroPost.slug}`}>{heroPost.title}</Link>
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                {heroPost.summary}
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-foreground">
                  By {heroPost.authors?.[0] || siteMetadata.author}
                </span>
                <span className="text-muted-foreground">•</span>
                <time className="text-sm text-muted-foreground" dateTime={heroPost.date}>
                  {formatDate(heroPost.date, siteMetadata.locale)}
                </time>
              </div>
            </div>
            {heroPost.images && heroPost.images.length > 0 && (
              <div className="relative aspect-video lg:aspect-square w-full overflow-hidden rounded-[var(--radius)]">
                <Image
                  src={heroPost.images[0]}
                  alt={heroPost.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Latest Posts Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-primary">Recent Articles</h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
              aria-label="All posts"
            >
              View all &rarr;
            </Link>
          )}
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!gridPosts.length && 'No posts found.'}
          {gridPosts.map((post) => {
            const { slug, date, title, summary, tags, authors } = post
            return (
              <li key={slug} className="group flex flex-col justify-between space-y-4">
                <article className="flex flex-col space-y-4">
                  {post.images && post.images.length > 0 ? (
                     <Link href={`/blog/${slug}`} className="block relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-muted">
                        <Image
                           src={post.images[0]}
                           alt={title}
                           fill
                           className="object-cover transition-transform duration-300 group-hover:scale-105"
                           referrerPolicy="no-referrer"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     </Link>
                  ) : (
                    <Link href={`/blog/${slug}`} className="block relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-muted border border-border/50 flex items-center justify-center">
                       <span className="text-muted-foreground/50 font-medium">{title.substring(0,2)}</span>
                    </Link>
                  )}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 2).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors line-clamp-2">
                      <Link href={`/blog/${slug}`}>{title}</Link>
                    </h3>
                    <p className="prose max-w-none text-muted-foreground line-clamp-3 text-sm">
                      {summary}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <span className="text-xs font-medium text-foreground">
                      {authors?.[0] || siteMetadata.author}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <time className="text-xs text-muted-foreground" dateTime={date}>
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
        <section className="bg-card border border-border shadow-sm rounded-[var(--radius)] p-8 my-12 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold tracking-tight text-primary mb-2">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-6 max-w-lg">Get the latest insights, tutorials, and tech news delivered directly to your inbox every week.</p>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </section>
      )}
    </div>
  )
}
