import type { PropsWithChildren, PropsWithClassName } from '@/shared/types'

import styles from './Container.module.scss'

type Props = PropsWithClassName & PropsWithChildren

export function Container({ children, className }: Props) {
  return (
    <div className={[styles.root, className ?? ''].join(' ')}>{children}</div>
  )
}
