import type { Metadata } from 'next'

import { articles } from '@/entities/Article'
import type { ArticleCategory } from '@/entities/Article'
import { ArticleGrid } from '@/widgets/ArticleGrid'
import { BlogHero } from '@/widgets/BlogHero'
import { CategoryFilter } from '@/widgets/CategoryFilter'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Статьи мастера по ремонту аудиотехники — усилители, винил, ресиверы, акустика.',
}

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const activeCategory = category as ArticleCategory | undefined

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles

  return (
    <>
      <Header />
      <BlogHero />
      <CategoryFilter activeCategory={activeCategory} />
      <ArticleGrid articles={filtered} />
      <Footer />
    </>
  )
}
