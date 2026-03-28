'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './page.module.scss'

type PriceRow = {
  work: string
  price: string
  note?: string
}

type PricingGroup = {
  slug: string
  title: string
  rows: PriceRow[]
}

type Props = {
  groups: PricingGroup[]
}

export function PricingSection({ groups }: Props) {
  const ref = useRef<HTMLDivElement>(null)
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
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.tables} ${animated ? styles.tablesAnimated : ''}`}
    >
      {groups.map((group) => (
        <div key={group.slug} id={group.slug} className={styles.tableBlock}>
          <h3 className={styles.tableTitle}>{group.title}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thWork}>Вид работы</th>
                <th className={styles.thPrice}>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.work} className={styles.row}>
                  <td className={styles.tdWork}>
                    {row.work}
                    {row.note && (
                      <span className={styles.note}>{row.note}</span>
                    )}
                  </td>
                  <td className={styles.tdPrice}>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
