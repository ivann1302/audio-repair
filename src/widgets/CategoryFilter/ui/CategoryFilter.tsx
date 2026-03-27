'use client'

import { useRouter } from 'next/navigation'

import { categoryLabels } from '@/entities/Article'
import type { ArticleCategory } from '@/entities/Article'
import type { PropsWithClassName } from '@/shared/types'
import { Container } from '@/shared/ui'

import styles from './CategoryFilter.module.scss'

const ALL = 'all'

type Props = PropsWithClassName & {
  activeCategory?: ArticleCategory
}

export function CategoryFilter({ activeCategory, className }: Props) {
  const router = useRouter()

  const select = (value: ArticleCategory | typeof ALL) => {
    const url = value === ALL ? '/blog' : `/blog?category=${value}`
    router.push(url)
  }

  const active = activeCategory ?? ALL

  return (
    <div className={[styles.root, className ?? ''].join(' ')}>
      <Container>
        <ul className={styles.list}>
          <li>
            <button
              className={[
                styles.item,
                active === ALL ? styles.itemActive : '',
              ].join(' ')}
              onClick={() => select(ALL)}
            >
              ВСЕ
            </button>
          </li>
          {(Object.entries(categoryLabels) as [ArticleCategory, string][]).map(
            ([key, label]) => (
              <li key={key}>
                <button
                  className={[
                    styles.item,
                    active === key ? styles.itemActive : '',
                  ].join(' ')}
                  onClick={() => select(key)}
                >
                  {label.toUpperCase()}
                </button>
              </li>
            )
          )}
        </ul>
      </Container>
    </div>
  )
}
