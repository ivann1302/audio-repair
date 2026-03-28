'use client'

import { useAppStore } from '@/shared/lib/store'

import styles from './Footer.module.scss'

export function FooterCta() {
  const openRepairModal = useAppStore((s) => s.openRepairModal)
  return (
    <button className={styles.ctaButton} onClick={openRepairModal}>
      ОСТАВИТЬ ЗАЯВКУ
    </button>
  )
}
