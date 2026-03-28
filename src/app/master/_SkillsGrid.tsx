'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './page.module.scss'

type SkillItem = {
  title: string
  text: string
}

type Props = {
  items: SkillItem[]
}

export function SkillsGrid({ items }: Props) {
  const ref = useRef<HTMLUListElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <ul
      ref={ref}
      className={`${styles.skillsGrid} ${animated ? styles.skillsAnimated : ''}`}
    >
      {items.map((s) => (
        <li key={s.title} className={styles.skillCard}>
          <span className={styles.skillMark}>◎</span>
          <h3 className={styles.skillName}>{s.title}</h3>
          <p className={styles.skillText}>{s.text}</p>
        </li>
      ))}
    </ul>
  )
}
