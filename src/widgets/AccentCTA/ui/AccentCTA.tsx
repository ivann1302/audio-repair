'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './AccentCTA.module.scss'

export function AccentCTA() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.root}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden />
          НЕ ВЫБРАСЫВАЙТЕ — РЕМОНТИРУЙТЕ
        </p>
        <h2
          ref={titleRef}
          className={`${styles.title} ${visible ? styles.titleVisible : ''}`}
        >
          ТЕХНИКА
          <br />
          ЗАСЛУЖИВАЕТ
          <br />
          ВТОРОЙ ЖИЗНИ
        </h2>
      </div>

      <div className={styles.right}>
        <p className={styles.description}>
          Привезите аппарат или опишите проблему по телефону. Диагностика —
          бесплатно. Работаем без выходных.
        </p>
        <a href="/contact" className={styles.button}>
          ОСТАВИТЬ ЗАЯВКУ →
        </a>
      </div>
    </section>
  )
}
