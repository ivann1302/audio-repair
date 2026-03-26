import Image from 'next/image'
import Link from 'next/link'

import type { PropsWithClassName } from '@/shared/types'

import { categoryLabels } from '../model/types'
import type { Article } from '../model/types'

import styles from './ArticleCard.module.scss'

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

export function ArticleCard({ article, className }: Props) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={[styles.root, className ?? ''].join(' ')}
    >
      <div className={styles.cover}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>
            {categoryLabels[article.category]}
          </span>
          <span className={styles.readTime}>{article.readTime} мин</span>
        </div>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        <time className={styles.date} dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>
    </Link>
  )
}
