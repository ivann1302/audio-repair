'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './page.module.scss'

const principles = [
  [
    'Честная диагностика',
    'Называю истинную причину поломки и реальную стоимость ещё до начала работ.',
  ],
  [
    'Оригинальные компоненты',
    'Подбираю проверенные компоненты под конкретную схему, а не «что дешевле».',
  ],
  [
    'Гарантия на работы',
    '6 месяцев на выполненный ремонт. Если что-то не так — исправлю бесплатно.',
  ],
  [
    'Обратная связь',
    'Объясняю что сломалось, почему и как это предотвратить в будущем. Предоставляю фотоотчет процесса ремонта.',
  ],
]

export function PrinciplesSection() {
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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <ul ref={ref} className={styles.principlesList}>
      {principles.map(([title, text], index) => (
        <li
          key={title}
          className={`${styles.principle} ${animated ? styles.principleVisible : ''}`}
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <span className={styles.principleAccent}>—</span>
          <div>
            <strong className={styles.principleTitle}>{title}</strong>
            <p className={styles.principleText}>{text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
