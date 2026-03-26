import { reviews } from '@/entities/Review'
import { Container } from '@/shared/ui'

import styles from './ReviewsSection.module.scss'

export function ReviewsSection() {
  return (
    <section className={styles.root}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>ОТЗЫВЫ</h2>
          <p className={styles.tagline}>Реальные слова реальных людей.</p>
        </div>

        <hr className={styles.divider} />

        <ul className={styles.grid}>
          {reviews.slice(0, 3).map((review, index) => (
            <li
              key={review.id}
              className={`${styles.card} ${index === 1 ? styles.cardDark : ''}`}
            >
              <span className={styles.quote} aria-hidden>
                «
              </span>
              <p className={styles.text}>{review.text}</p>
              <hr className={styles.cardDivider} />
              <p className={styles.author}>
                {review.author} —{' '}
                <strong className={styles.equipment}>{review.equipment}</strong>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
