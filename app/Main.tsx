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
        <section className="bg-card border-border relative overflow-hidden rounded-[var(--radius)] border p-6 shadow-sm sm:p-10 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {heroPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent/10 text-accent inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-primary text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <Link href={`/blog/${heroPost.slug}`}>{heroPost.title}</Link>
              </h1>
              <p className="text-muted-foreground text-lg leading-8">{heroPost.summary}</p>
              <div className="flex items-center space-x-4">
                <span className="text-foreground text-sm font-medium">
                  توسط {heroPost.authors?.[0] || siteMetadata.author}
                </span>
                <span className="text-muted-foreground">•</span>
                <time className="text-muted-foreground text-sm" dateTime={heroPost.date}>
                  {formatDate(heroPost.date, siteMetadata.locale)}
                </time>
              </div>
            </div>
            {heroPost.images && heroPost.images.length > 0 && (
              <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius)] lg:aspect-square">
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
        <div className="border-border flex items-center justify-between border-b pb-4">
          <h2 className="text-primary text-2xl font-bold tracking-tight">مقاله‌های اخیر</h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="text-accent hover:text-accent/80 text-sm font-semibold transition-colors"
              aria-label="All posts"
            >
              &larr; مشاهده همه
            </Link>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!gridPosts.length && 'هیچ پستی یافت نشد.'}
          {gridPosts.map((post) => {
            const { slug, date, title, summary, tags, authors } = post
            return (
              <li key={slug} className="group flex flex-col justify-between space-y-4">
                <article className="flex flex-col space-y-4">
                  {post.images && post.images.length > 0 ? (
                    <Link
                      href={`/blog/${slug}`}
                      className="bg-muted relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)]"
                    >
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
                    <Link
                      href={`/blog/${slug}`}
                      className="bg-muted border-border/50 relative block flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[var(--radius)] border"
                    >
                      <span className="text-muted-foreground/50 font-medium">
                        {title.substring(0, 2)}
                      </span>
                    </Link>
                  )}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 2).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <h3 className="text-primary group-hover:text-accent line-clamp-2 text-xl font-bold tracking-tight transition-colors">
                      <Link href={`/blog/${slug}`}>{title}</Link>
                    </h3>
                    <p className="prose text-muted-foreground line-clamp-3 max-w-none text-sm">
                      {summary}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <span className="text-foreground text-xs font-medium">
                      {authors?.[0] || siteMetadata.author}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <time className="text-muted-foreground text-xs" dateTime={date}>
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
        <section className="bg-card border-border my-12 flex flex-col items-center justify-center rounded-[var(--radius)] border p-8 text-center shadow-sm">
          <h3 className="text-primary mb-2 text-2xl font-bold tracking-tight">
            اشتراک در خبرنامه ما
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg">
            جدیدترین بینش‌ها، آموزش‌ها و اخبار تکنولوژی را هر هفته مستقیماً در صندوق ورودی خود
            دریافت کنید.
          </p>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </section>
      )}
    </div>
  )
}
