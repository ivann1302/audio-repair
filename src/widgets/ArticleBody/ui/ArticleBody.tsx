import Link from 'next/link'

import type { Article } from '@/entities/Article'
import { siteConfig } from '@/shared/config/seo'
import type { PropsWithClassName } from '@/shared/types'
import { Container } from '@/shared/ui'

import styles from './ArticleBody.module.scss'

type Props = PropsWithClassName & {
  article: Article
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)]
  return matches.map((m) => {
    const text = m[1].replace(/<[^>]+>/g, '')
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zа-я0-9-]/gi, '')
    return { id, text }
  })
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, '')
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zа-я0-9-]/gi, '')
    return `<h2 id="${id}">${inner}</h2>`
  })
}

export function ArticleBody({ article, className }: Props) {
  const headings = extractHeadings(article.content)
  const contentWithIds = injectHeadingIds(article.content)

  return (
    <section className={[styles.root, className ?? ''].join(' ')}>
      <Container className={styles.inner}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: contentWithIds }}
        />

        <aside className={styles.sidebar}>
          {headings.length > 1 && (
            <div className={styles.toc}>
              <p className={styles.tocTitle}>СОДЕРЖАНИЕ</p>
              <ul className={styles.tocList}>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className={styles.tocLink}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.author}>
            <div className={styles.authorPhoto} aria-hidden />
            <div className={styles.authorInfo}>
              <p className={styles.authorName}>Алексей Морозов</p>
              <p className={styles.authorBio}>
                Частный мастер по ремонту Hi-Fi аудиотехники с 2009 года.
              </p>
              <Link href="/master" className={styles.authorLink}>
                О мастере →
              </Link>
            </div>
          </div>

          <div className={styles.cta}>
            <p className={styles.ctaTitle}>НУЖЕН РЕМОНТ?</p>
            <p className={styles.ctaText}>
              Диагностика бесплатно. Свяжитесь — расскажу, можно ли помочь.
            </p>
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              className={styles.ctaPhone}
            >
              {siteConfig.phone}
            </a>
          </div>
        </aside>
      </Container>
    </section>
  )
}
