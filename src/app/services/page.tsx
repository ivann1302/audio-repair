import type { Metadata } from 'next'

import { services } from '@/entities/Service'
import { RepairRequestModal } from '@/features/RepairRequest'
import { siteConfig } from '@/shared/config/seo'
import { Button, Container } from '@/shared/ui'
import { AccentCTA } from '@/widgets/AccentCTA'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'

import { PricingSection } from './_PricingSection'
import { TypesGrid } from './_TypesGrid'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'Услуги и цены — ремонт аудиотехники',
  description:
    'Стоимость ремонта усилителей, ресиверов, виниловых проигрывателей, акустики и магнитофонов. Диагностика бесплатно.',
}

type PriceRow = {
  work: string
  price: string
  note?: string
}

type ServicePricing = {
  slug: string
  rows: PriceRow[]
}

const pricing: ServicePricing[] = [
  {
    slug: 'amplifiers',
    rows: [
      { work: 'Диагностика', price: '1 500 ₽' },
      { work: 'Замена выходных транзисторов', price: 'от 2 500 ₽' },
      {
        work: 'Замена электролитических конденсаторов',
        price: '1 500 – 4 000 ₽',
        note: '+ стоимость компонентов',
      },
      { work: 'Настройка тока покоя', price: 'от 800 ₽' },
      { work: 'Восстановление после КЗ', price: 'от 3 500 ₽' },
      { work: 'Капитальный ремонт (полная переборка)', price: 'от 6 000 ₽' },
    ],
  },
  {
    slug: 'receivers',
    rows: [
      { work: 'Диагностика', price: '1 500 ₽' },
      { work: 'Ремонт усилительной секции', price: 'от 3 000 ₽' },
      {
        work: 'Замена HDMI-платы',
        price: 'от 4 000 ₽',
        note: '+ стоимость платы',
      },
      { work: 'Восстановление блока питания', price: 'от 2 500 ₽' },
      { work: 'Перепрошивка', price: 'от 1 500 ₽' },
      { work: 'Чистка и профилактика', price: 'от 1 200 ₽' },
    ],
  },
  {
    slug: 'vinyl',
    rows: [
      { work: 'Диагностика', price: '1 500 ₽' },
      {
        work: 'Замена иглы / головки звукоснимателя',
        price: 'от 500 ₽',
        note: '+ стоимость иглы',
      },
      { work: 'Настройка тонарма', price: 'от 1 000 ₽' },
      { work: 'Ремонт тонмотора', price: 'от 1 500 ₽' },
      { work: 'Обслуживание механики', price: 'от 1 200 ₽' },
      { work: 'Ремонт фонокорректора', price: 'от 2 000 ₽' },
    ],
  },
  {
    slug: 'speakers',
    rows: [
      { work: 'Диагностика', price: '1 500 ₽' },
      {
        work: 'Замена динамика',
        price: 'от 1 200 ₽',
        note: '+ стоимость динамика',
      },
      { work: 'Ремонт кроссовера', price: 'от 1 500 ₽' },
      { work: 'Перемотка звуковой катушки', price: 'от 2 000 ₽' },
      { work: 'Замена подвеса', price: 'от 800 ₽' },
    ],
  },
  {
    slug: 'cd/dvd-players',
    rows: [
      { work: 'Диагностика', price: '1 500 ₽' },
      {
        work: 'Замена лазерной головки',
        price: 'от 2 000 ₽',
        note: '+ стоимость головки',
      },
      { work: 'Ремонт механики транспорта', price: 'от 2 500 ₽' },
      { work: 'Восстановление ЦАП-секции', price: 'от 3 500 ₽' },
      { work: 'Чистка лазерной системы', price: 'от 1 000 ₽' },
    ],
  },
  {
    slug: 'tape-recorders',
    rows: [
      { work: 'Диагностика', price: '1 500 ₽' },
      {
        work: 'Замена пассиков',
        price: 'от 800 ₽',
        note: '+ стоимость пассиков',
      },
      { work: 'Чистка и размагничивание головок', price: 'от 600 ₽' },
      { work: 'Ремонт лентопротяжного механизма', price: 'от 2 000 ₽' },
      { work: 'Настройка скорости лентопротяжки', price: 'от 1 000 ₽' },
      {
        work: 'Восстановление усилителя записи/воспроизведения',
        price: 'от 2 500 ₽',
      },
    ],
  },
]

const pricingGroups = pricing.map((p) => ({
  ...p,
  title: services.find((s) => s.slug === p.slug)?.title ?? p.slug,
}))

export default function ServicesPage() {
  return (
    <>
      <Header />

      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <p className={styles.eyebrow}>УСЛУГИ</p>
          <h1 className={styles.heroTitle}>РЕМОНТ АУДИОТЕХНИКИ</h1>
          <p className={styles.heroSub}>
            Работаю с отечественной и импортной аппаратурой. Диагностика —
            бесплатно. Начальная стоимость ремонта составляет 2 500 ₽ (включая
            диагностику). Конечная стоимость согласовывается до начала работ.
          </p>
          <div className={styles.heroActions}>
            <Button
              variant="primary"
              size="lg"
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              className={styles.heroBtn}
            >
              ПОЗВОНИТЬ
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#pricing"
              className={styles.heroBtn}
            >
              ЦЕНЫ
            </Button>
          </div>
        </Container>
      </section>

      {/* ─── Service types ────────────────────────────────────────────────────── */}
      <section className={styles.types}>
        <Container>
          <p className={styles.eyebrowDark}>ЧТО РЕМОНТИРУЕМ</p>
          <h2 className={styles.sectionTitle}>ВИДЫ ТЕХНИКИ</h2>
          <TypesGrid />
        </Container>
      </section>

      {/* ─── Pricing tables ───────────────────────────────────────────────────── */}
      <section id="pricing" className={styles.pricing}>
        <Container>
          <p className={styles.eyebrow}>СТОИМОСТЬ РАБОТ</p>
          <h2 className={styles.sectionTitle}>ЦЕНЫ</h2>

          <PricingSection groups={pricingGroups} />

          <p className={styles.disclaimer}>
            * Окончательная стоимость определяется после диагностики. Цены
            указаны за работу, стоимость запчастей рассчитывается отдельно.
          </p>
        </Container>
      </section>

      <AccentCTA />

      <Footer />
      <RepairRequestModal />
    </>
  )
}
