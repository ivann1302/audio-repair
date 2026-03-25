export const siteConfig = {
  name: 'АудиоРемонт',
  description:
    'Профессиональный ремонт аудиотехники: усилители, ресиверы, акустика, винил. Опыт более 15 лет.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audio-repair.ru',
  locale: 'ru_RU',
  phone: '+7 (999) 000-00-00',
  address: 'Москва',
  ogImage: '/og-image.jpg',
} as const
