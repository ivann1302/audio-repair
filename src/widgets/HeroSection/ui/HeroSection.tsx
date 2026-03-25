import Link from 'next/link'

import type { PropsWithClassName } from '@/shared/types'

import styles from './HeroSection.module.scss'

type Props = PropsWithClassName

export function HeroSection({ className }: Props) {
  return (
    <section className={`${styles.root} ${className ?? ''}`}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Частный мастер · Москва</span>
        <h1 className={styles.title}>
          РЕМОНТ
          <br />
          АУДИО
          <br />
          ТЕХНИКИ
        </h1>
        <p className={styles.subtitle}>
          Усилители, ресиверы, виниловые проигрыватели,
          <br />
          акустика. Диагностика бесплатно.
        </p>
        <div className={styles.actions}>
          <Link href="/#contacts" className={styles.btnPrimary}>
            ОСТАВИТЬ ЗАЯВКУ
          </Link>
          <Link href="/#services" className={styles.btnSecondary}>
            УСЛУГИ И ЦЕНЫ
          </Link>
        </div>
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeNumber}>15</span>
        <span className={styles.badgeLabel}>лет опыта</span>
      </div>
    </section>
  )
}
