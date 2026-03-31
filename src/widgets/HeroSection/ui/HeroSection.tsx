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
            Частный мастер · Москва · Работаю с 1991 года
          </span>
          <h2 className={styles.title}>
            ВЕРНУ
            <br />
            ВАШУ
            <br />
            ТЕХНИКУ
            <br />К ЖИЗНИ
          </h2>
          <h1 className={styles.subtitle}>
            Ремонт аудио- и видеоаппаратуры
            <br />
            от частного мастера.
            <br />
            Бережное отношение к вашей аппаратуре
          </h1>
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
            <span className={styles.badgeNumber}>35</span>
            <span className={styles.badgeLabel}>лет опыта</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
