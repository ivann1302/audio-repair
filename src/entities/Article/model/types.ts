export type ArticleCategory =
  | 'amplifiers'
  | 'vinyl'
  | 'receivers'
  | 'acoustics'
  | 'other'

export const categoryLabels: Record<ArticleCategory, string> = {
  amplifiers: 'Усилители',
  vinyl: 'Винил',
  receivers: 'Ресиверы',
  acoustics: 'Акустика',
  other: 'Разное',
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  publishedAt: string
  coverImage: string
  readTime: number
  content: string
}
