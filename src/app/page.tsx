import type { Metadata } from 'next'

import { siteConfig } from '@/shared/config/seo'
import { AboutSection } from '@/widgets/AboutSection'
import { AccentCTA } from '@/widgets/AccentCTA'
import { Header } from '@/widgets/Header'
import { HeroSection } from '@/widgets/HeroSection'
import { MasterSection } from '@/widgets/MasterSection'
import { ProcessSection } from '@/widgets/ProcessSection'
import { ReviewsSection } from '@/widgets/ReviewsSection'
import { ServicesSection } from '@/widgets/ServicesSection'

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
      <ServicesSection />
      <MasterSection />
      <ProcessSection />
      <AccentCTA />
      <AboutSection />
      <ReviewsSection />
      {/* TODO: <ContactsSection /> */}
      {/* TODO: <Footer /> */}
    </>
  )
}
