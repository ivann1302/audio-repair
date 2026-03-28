import type { Metadata } from 'next'

import { RepairRequestModal } from '@/features/RepairRequest'
import { siteConfig } from '@/shared/config/seo'
import { localBusinessSchema } from '@/shared/lib/schema'
import { AboutSection } from '@/widgets/AboutSection'
import { AccentCTA } from '@/widgets/AccentCTA'
import { BlogCarousel } from '@/widgets/BlogCarousel'
import { ContactsSection } from '@/widgets/ContactsSection'
import { FAQSection } from '@/widgets/FAQSection'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HeroSection } from '@/widgets/HeroSection'
import { MasterSection } from '@/widgets/MasterSection'
import { ProcessSection } from '@/widgets/ProcessSection'
import { ReviewsSection } from '@/widgets/ReviewsSection'
import { ServicesSection } from '@/widgets/ServicesSection'

export const metadata: Metadata = {
  title: 'Ремонт аудиотехники в Москве — усилители, ресиверы, акустика, винил',
  description: siteConfig.description,
  openGraph: {
    title:
      'Ремонт аудиотехники в Москве — усилители, ресиверы, акустика, винил',
    description: siteConfig.description,
    url: siteConfig.url,
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema()),
        }}
      />
      <Header />
      <HeroSection />
      <ServicesSection />
      <MasterSection />
      <ProcessSection />
      <AccentCTA />
      <AboutSection />
      <ReviewsSection />
      <ContactsSection />
      <FAQSection />
      <BlogCarousel />
      <Footer />
      <RepairRequestModal />
    </>
  )
}
