'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './page.module.scss'

type StatItem = {
  value: string
  label: string
}

type Props = {
  items: StatItem[]
}

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { num: 0, suffix: value }
  return { num: parseInt(match[1], 10), suffix: match[2] }
}

function CountUpValue({ value, active }: { value: string; active: boolean }) {
  const { num, suffix } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active || num === 0) return
    const duration = 1200
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * num))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [active, num])

  return (
    <>
      {display}
      {suffix}
    </>
  )
}

export function StatsSection({ items }: Props) {
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <ul
      ref={ref}
      className={`${styles.statsList} ${animated ? styles.statsAnimated : ''}`}
    >
      {items.map((s) => (
        <li key={s.label} className={styles.statItem}>
          <span className={styles.statValue}>
            <CountUpValue value={s.value} active={animated} />
          </span>
          <span className={styles.statLabel}>{s.label}</span>
        </li>
      ))}
    </ul>
  )
}
