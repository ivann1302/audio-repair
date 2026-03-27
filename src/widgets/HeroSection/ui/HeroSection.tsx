'use client'

import Image from 'next/image'

import { useAppStore } from '@/shared/lib/store'
import type { PropsWithClassName } from '@/shared/types'
import { Button, Container } from '@/shared/ui'

import styles from './HeroSection.module.scss'

type Props = PropsWithClassName

export function HeroSection({ className }: Props) {
  const openRepairModal = useAppStore((s) => s.openRepairModal)

  return (
    <section className={`${styles.root} ${className ?? ''}`}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Частный мастер · Москва · Работаю с 2010 года
          </span>
          <h1 className={styles.title}>
            ВЕРНЁМ
            <br />
            ВАШУ
            <br />
            ТЕХНИКУ
            <br />К ЖИЗНИ
          </h1>
          <p className={styles.subtitle}>
            Усилители, ресиверы, виниловые проигрыватели,
            <br />
            акустика. Диагностика бесплатно.
            <br />
            Бережное отношение к вашей технике
          </p>
          <div className={styles.actions}>
            <Button variant="primary" size="lg" onClick={openRepairModal}>
              ОСТАВИТЬ ЗАЯВКУ
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              УСЛУГИ И ЦЕНЫ
            </Button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/hero.webp"
            alt="Ремонт аудиотехники"
            width={1024}
            height={1536}
            className={styles.image}
            priority
          />
          <div className={styles.badge}>
            <span className={styles.badgeNumber}>15</span>
            <span className={styles.badgeLabel}>лет опыта</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
