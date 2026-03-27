import Image from 'next/image'
import Link from 'next/link'

import { categoryLabels } from '@/entities/Article'
import type { Article } from '@/entities/Article'
import type { PropsWithClassName } from '@/shared/types'
import { Container } from '@/shared/ui'

import styles from './ArticleHero.module.scss'

type Props = PropsWithClassName & {
  article: Article
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function ArticleHero({ article, className }: Props) {
  return (
    <section className={[styles.root, className ?? ''].join(' ')}>
      <div className={styles.cover}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.overlay} />
      </div>

      <Container className={styles.content}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.crumb}>
            Главная
          </Link>
          <span className={styles.sep} aria-hidden>
            /
          </span>
          <Link href="/blog" className={styles.crumb}>
            Блог
          </Link>
          <span className={styles.sep} aria-hidden>
            /
          </span>
          <span className={styles.crumbCurrent}>{article.title}</span>
        </nav>

        <span className={styles.category}>
          {categoryLabels[article.category]}
        </span>
        <h1 className={styles.title}>{article.title}</h1>
        <time className={styles.date} dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </Container>
    </section>
  )
}
