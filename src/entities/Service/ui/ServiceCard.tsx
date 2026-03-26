import type { PropsWithClassName } from '@/shared/types'
import { Icon } from '@/shared/ui'

import type { Service } from '../model/types'

import styles from './ServiceCard.module.scss'

type Props = PropsWithClassName & {
  service: Service
}

export function ServiceCard({ service, className }: Props) {
  return (
    <article className={[styles.root, className ?? ''].join(' ')}>
      <div className={styles.iconWrapper}>
        <Icon name={service.icon} size={32} label={service.title} />
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
      <p className={styles.price}>
        от{' '}
        <span className={styles.priceValue}>
          {service.priceFrom.toLocaleString('ru-RU')} ₽
        </span>
      </p>
    </article>
  )
}
