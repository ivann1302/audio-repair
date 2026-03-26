import type { PropsWithClassName } from '@/shared/types'

import styles from './Icon.module.scss'
import { icons, type IconName } from './icons'

type Props = PropsWithClassName & {
  name: IconName
  size?: number
  label?: string
}

export function Icon({ name, size = 24, label, className }: Props) {
  const SvgIcon = icons[name]

  return (
    <span
      className={[styles.root, className ?? ''].join(' ')}
      style={{ width: size, height: size }}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
    >
      <SvgIcon size={size} />
    </span>
  )
}
