import type { PropsWithClassName } from '@/shared/types'
import { Container } from '@/shared/ui'

import styles from './BlogHero.module.scss'

type Props = PropsWithClassName

export function BlogHero({ className }: Props) {
  return (
    <section className={[styles.root, className ?? ''].join(' ')}>
      <Container>
        <p className={styles.eyebrow}>ЗАПИСКИ МАСТЕРА</p>
        <h1 className={styles.title}>БЛОГ</h1>
        <p className={styles.subtitle}>
          Советы по обслуживанию, истории ремонтов и разборы аудиотехники
        </p>
      </Container>
    </section>
  )
}
