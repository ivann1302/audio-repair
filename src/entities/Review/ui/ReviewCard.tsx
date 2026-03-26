import type { PropsWithClassName } from '@/shared/types'

import type { Review } from '../model/types'

import styles from './ReviewCard.module.scss'

type Props = PropsWithClassName & {
  review: Review
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
  })
}

export function ReviewCard({ review, className }: Props) {
  return (
    <article className={[styles.root, className ?? ''].join(' ')}>
      <blockquote className={styles.text}>
        <p>{review.text}</p>
      </blockquote>
      <footer className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.author}>{review.author}</span>
          <span className={styles.equipment}>{review.equipment}</span>
        </div>
        <time className={styles.date} dateTime={review.date}>
          {formatDate(review.date)}
        </time>
      </footer>
    </article>
  )
}
