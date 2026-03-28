'use client'

import { useEffect, useRef, useState } from 'react'

import { services } from '@/entities/Service'

import styles from './page.module.scss'

export function TypesGrid() {
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
      className={`${styles.typesGrid} ${animated ? styles.typesAnimated : ''}`}
    >
      {services.map((service) => (
        <li key={service.id} className={styles.typesItem}>
          <a href={`#${service.slug}`} className={styles.typeCard}>
            <span className={styles.typeNum}>◎</span>
            <h3 className={styles.typeName}>{service.title}</h3>
            <p className={styles.typeDesc}>{service.description}</p>
            <span className={styles.typePrice}>
              от {service.priceFrom.toLocaleString('ru')} ₽
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
