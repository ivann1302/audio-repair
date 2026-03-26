'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { articles } from '@/entities/Article'

import styles from './BlogCarousel.module.scss'

const categoryLabels: Record<string, string> = {
  amplifiers: 'Усилители',
  vinyl: 'Винил',
  receivers: 'Ресиверы',
  acoustics: 'Акустика',
  other: 'Разное',
}

export function BlogCarousel() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLUListElement>(null)
  const touchStartX = useRef(0)
  const total = articles.length

  const goTo = useCallback(
    (index: number) => {
      const i = ((index % total) + total) % total
      setCurrent(i)
      if (!trackRef.current) return
      const card = trackRef.current.children[i] as HTMLElement
      trackRef.current.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
    },
    [total]
  )

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 4000)
    return () => clearInterval(timer)
  }, [current, goTo])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1)
    }
  }

  return (
    <section className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>БЛОГ</h2>
        <p className={styles.tagline}>Статьи об аналоговом звуке и ремонте</p>
      </div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => goTo(current - 1)}
          aria-label="Предыдущая статья"
        >
          ‹
        </button>

        <ul
          ref={trackRef}
          className={styles.track}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {articles.map((article) => (
            <li key={article.slug} className={styles.card}>
              <div className={styles.cover} />
              <div className={styles.content}>
                <span className={styles.category}>
                  {categoryLabels[article.category] ?? article.category}
                </span>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <p className={styles.meta}>
                  {article.publishedAt} · {article.readTime} мин
                </p>
              </div>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => goTo(current + 1)}
          aria-label="Следующая статья"
        >
          ›
        </button>
      </div>

      <div className={styles.mobileControls}>
        <button
          onClick={() => goTo(current - 1)}
          className={styles.mobileArrow}
          aria-label="Предыдущая статья"
        >
          ‹
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className={styles.mobileArrow}
          aria-label="Следующая статья"
        >
          ›
        </button>
      </div>
    </section>
  )
}
