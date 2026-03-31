'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './AboutSection.module.scss'

type StatConfig = {
  end: number
  suffix: string
  label: string
  duration: number
  pulse?: boolean
}

const stats: StatConfig[] = [
  {
    end: 5000,
    suffix: '+',
    label: 'Отремонтировано аппаратов',
    duration: 900,
  },
  {
    end: 6,
    suffix: ' МЕС',
    label: 'Гарантия на все работы',
    duration: 900,
  },
  {
    end: 1500,
    suffix: ' ₽',
    label: 'Диагностика',
    duration: 900,
  },
]

type StatItemProps = {
  stat: StatConfig
  active: boolean
}

function StatItem({ stat, active }: StatItemProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || stat.end === 0) return

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / stat.duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * stat.end))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setCount(stat.end)
      }
    }

    requestAnimationFrame(tick)
  }, [active, stat.end, stat.duration])

  return (
    <li className={styles.stat}>
      <span className={styles.statValue}>
        {count}
        {stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </li>
  )
}

export function AboutSection() {
  const statsRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.root}>
      <div className={styles.photo} aria-hidden>
        <span className={styles.photoPlaceholder}>ФОТО</span>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden /> О МАСТЕРЕ
          </p>
          <h2 className={styles.title}>
            35 ЛЕТ
            <br />
            ПРАКТИКИ
          </h2>
          <p className={styles.bio}>
            Начинал в 1991-м — чинил технику еще в школе. Сегодня работаю с
            любым видом техники, включая иностранные бренды и советскую
            классику. Каждый аппарат - отдельная история.
          </p>
        </div>

        <ul ref={statsRef} className={styles.stats}>
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={active} />
          ))}
        </ul>
      </div>
    </section>
  )
}
