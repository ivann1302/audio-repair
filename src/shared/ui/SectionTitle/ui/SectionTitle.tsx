import type { PropsWithClassName } from '@/shared/types'

import styles from './SectionTitle.module.scss'

type Props = PropsWithClassName & {
  title: string
  eyebrow?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionTitle({
  title,
  eyebrow,
  align = 'left',
  light = false,
  className,
}: Props) {
  return (
    <div
      className={[
        styles.root,
        styles[align],
        light ? styles.light : '',
        className ?? '',
      ].join(' ')}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
