'use client'

import { useEffect, useRef, useState } from 'react'

import { services } from '@/entities/Service'
import { Container } from '@/shared/ui'

import styles from './ServicesSection.module.scss'

export function ServicesSection() {
  const gridRef = useRef<HTMLUListElement>(null)
  const [animated, setAnimated] = useState(false)
  useEffect(() => {
    const el = gridRef.current
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
    <section className={styles.root}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>ЧТО РЕМОНТИРУЮ</h2>
          <p className={styles.tagline}>
            Работаю с отечественной и иностранной техникой
          </p>
        </div>

        <ul
          ref={gridRef}
          className={`${styles.grid} ${animated ? styles.animated : ''}`}
        >
          {services.map((service, index) => (
            <li key={service.id} className={styles.card}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <a href="/services" className={styles.allLink}>
            Все услуги и цены →
          </a>
        </div>
      </Container>
    </section>
  )
}
