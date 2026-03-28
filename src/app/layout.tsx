import type { Metadata } from 'next'
import { PT_Serif, Russo_One } from 'next/font/google'

import { siteConfig } from '@/shared/config/seo'
import { Providers } from '@/shared/lib/providers'

import '@/shared/styles/reset.scss'

const russoOne = Russo_One({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  display: 'swap',
})

const ptSerif = PT_Serif({
  variable: '--font-body',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'ремонт аудиотехники',
    'ремонт усилителей',
    'ремонт ресиверов',
    'ремонт акустики',
    'ремонт виниловых проигрывателей',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${russoOne.variable} ${ptSerif.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
