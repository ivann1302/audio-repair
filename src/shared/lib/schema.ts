import { siteConfig } from '@/shared/config/seo'

const AUTHOR_NAME = 'Алексей Морозов'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    priceRange: '₽₽',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressCountry: 'RU',
    },
    areaServed: {
      '@type': 'City',
      name: 'Москва',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    employee: {
      '@type': 'Person',
      name: AUTHOR_NAME,
    },
  }
}

type ArticleSchemaProps = {
  title: string
  description: string
  publishedAt: string
  coverImage: string
  slug: string
}

export function articleSchema({
  title,
  description,
  publishedAt,
  coverImage,
  slug,
}: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: publishedAt,
    image: coverImage.startsWith('http')
      ? coverImage
      : `${siteConfig.url}${coverImage}`,
    url: `${siteConfig.url}/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: `${siteConfig.url}/master`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

type BreadcrumbItem = {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
