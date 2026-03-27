import Image from 'next/image'
import Link from 'next/link'

import { ArticleCard, categoryLabels } from '@/entities/Article'
import type { Article } from '@/entities/Article'
import type { PropsWithClassName } from '@/shared/types'
import { Container } from '@/shared/ui'

import styles from './ArticleGrid.module.scss'

type Props = PropsWithClassName & {
  articles: Article[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function ArticleGrid({ articles, className }: Props) {
  if (articles.length === 0) {
    return (
      <section className={[styles.root, className ?? ''].join(' ')}>
        <Container>
          <p className={styles.empty}>Статей в этой категории пока нет.</p>
        </Container>
      </section>
    )
  }

  const [featured, ...rest] = articles

  return (
    <section className={[styles.root, className ?? ''].join(' ')}>
      <Container>
        <Link href={`/blog/${featured.slug}`} className={styles.featured}>
          <div className={styles.featuredCover}>
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.featuredBody}>
            <span className={styles.featuredCategory}>
              {categoryLabels[featured.category]}
            </span>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <time
              className={styles.featuredDate}
              dateTime={featured.publishedAt}
            >
              {formatDate(featured.publishedAt)}
            </time>
          </div>
        </Link>

        {rest.length > 0 && (
          <ul className={styles.grid}>
            {rest.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
