import { ArticleCard } from '@/entities/Article'
import type { Article } from '@/entities/Article'
import type { PropsWithClassName } from '@/shared/types'
import { Container } from '@/shared/ui'

import styles from './RelatedArticles.module.scss'

type Props = PropsWithClassName & {
  articles: Article[]
}

export function RelatedArticles({ articles, className }: Props) {
  if (articles.length === 0) return null

  return (
    <section className={[styles.root, className ?? ''].join(' ')}>
      <Container>
        <p className={styles.eyebrow}>ЕЩЁ ПО ТЕМЕ</p>
        <h2 className={styles.title}>ПОХОЖИЕ СТАТЬИ</h2>
        <ul className={styles.grid}>
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
