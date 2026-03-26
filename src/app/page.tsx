import type { Metadata } from 'next'

import { siteConfig } from '@/shared/config/seo'
import { Header } from '@/widgets/Header'
import { HeroSection } from '@/widgets/HeroSection'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* TODO: <ServicesSection /> */}
      {/* TODO: <ProcessSection /> */}
      {/* TODO: <MasterSection /> */}
      {/* TODO: <AccentCTA /> */}
      {/* TODO: <TestimonialsSection /> */}
      {/* TODO: <ContactsSection /> */}
      {/* TODO: <Footer /> */}
    </>
  )
}
