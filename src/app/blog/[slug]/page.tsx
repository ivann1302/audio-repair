import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/entities/Article'
import { RepairRequestModal } from '@/features/RepairRequest'
import { siteConfig } from '@/shared/config/seo'
import { articleSchema, breadcrumbSchema } from '@/shared/lib/schema'
import { ArticleBody } from '@/widgets/ArticleBody'
import { ArticleHero } from '@/widgets/ArticleHero'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { RelatedArticles } from '@/widgets/RelatedArticles'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
      publishedTime: article.publishedAt,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  const related = getRelatedArticles(slug, 3)

  const ldArticle = articleSchema({
    title: article.title,
    description: article.excerpt,
    publishedAt: article.publishedAt,
    coverImage: article.coverImage,
    slug: article.slug,
  })

  const ldBreadcrumb = breadcrumbSchema([
    { name: 'Главная', url: siteConfig.url },
    { name: 'Блог', url: `${siteConfig.url}/blog` },
    { name: article.title, url: `${siteConfig.url}/blog/${article.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <Header />
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <RelatedArticles articles={related} />
      <Footer />
      <RepairRequestModal />
    </>
  )
}
