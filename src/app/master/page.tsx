import type { Metadata } from 'next'
import Image from 'next/image'

import { RepairRequestModal } from '@/features/RepairRequest'
import { siteConfig } from '@/shared/config/seo'
import { Button, Container } from '@/shared/ui'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'

import { PrinciplesSection } from './_PrinciplesSection'
import { SkillsGrid } from './_SkillsGrid'
import { StatsSection } from './_StatsSection'
import styles from './page.module.scss'

export const metadata: Metadata = {
  title: 'О мастере — Алексей Морозов',
  description:
    'Частный мастер по ремонту Hi-Fi аудиотехники с 2009 года. Усилители, ресиверы, виниловые проигрыватели, акустика.',
}

const stats = [
  { value: '15', label: 'лет опыта' },
  { value: '500+', label: 'отремонтированных аппаратов' },
  { value: '3', label: 'года гарантии на работы' },
  { value: '0 ₽', label: 'диагностика' },
]

const skills = [
  {
    title: 'ЛАМПОВАЯ ТЕХНИКА',
    text: 'Усилители, предусилители, корректоры. Намотка и согласование трансформаторов, подбор и замена ламп.',
  },
  {
    title: 'ТРАНЗИСТОРНЫЕ УСИЛИТЕЛИ',
    text: 'Советская и импортная аппаратура. Полная переборка, замена электролитов, регулировка тока покоя.',
  },
  {
    title: 'ВИНИЛОВЫЕ ПРОИГРЫВАТЕЛИ',
    text: 'Настройка тонарма и головки, ремонт тонмотора, восстановление деки и фоностадии.',
  },
  {
    title: 'AV-РЕСИВЕРЫ',
    text: 'Замена HDMI-плат, ремонт усилительных каскадов, перепрошивка, диагностика цифровой части.',
  },
  {
    title: 'АКУСТИЧЕСКИЕ СИСТЕМЫ',
    text: 'Перемотка и замена динамиков, ремонт кроссоверов, восстановление корпусов.',
  },
  {
    title: 'CD / SACD ПРОИГРЫВАТЕЛИ',
    text: 'Замена лазерных головок, ремонт механики транспорта, восстановление ЦАП-секции.',
  },
]

export default function MasterPage() {
  return (
    <>
      <Header />

      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>ЧАСТНЫЙ МАСТЕР · МОСКВА</p>
            <h1 className={styles.heroName}>АЛЕКСЕЙ МОРОЗОВ</h1>
            <p className={styles.heroSub}>
              Ремонт Hi-Fi и Hi-End аудиотехники с 2009 года.
              <br />
              Диагностика бесплатно — приеду или приносите.
            </p>
            <Button
              variant="primary"
              size="md"
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              className={styles.heroBtn}
            >
              ПОЗВОНИТЬ
            </Button>
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src="/images/hero.webp"
              alt="Алексей Морозов — мастер по ремонту аудиотехники"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              priority
            />
          </div>
        </Container>
      </section>

      {/* ─── Bio ────────────────────────────────────────────────────────────── */}
      <section className={styles.bio}>
        <Container className={styles.bioInner}>
          <div className={styles.bioText}>
            <p className={styles.eyebrowDark}>О СЕБЕ</p>
            <blockquote className={styles.quote}>
              «Каждый аппарат — это история. Я возвращаю технике голос.»
            </blockquote>
            <p className={styles.bioPara}>
              Начал с советских усилителей — «Радиотехники», «Электроники»,
              «Бригов». Со временем перешёл на импортную Hi-Fi технику: Marantz,
              Denon, Yamaha, NAD. Параллельно изучал ламповые схемы — и сегодня
              это основная часть работы.
            </p>
            <p className={styles.bioPara}>
              Работаю один, без мастерской — только выездная диагностика и
              работа дома. Это позволяет уделять каждому аппарату столько
              времени, сколько нужно. Не конвейер.
            </p>
            <p className={styles.bioPara}>
              Использую только проверенные компоненты: конденсаторы Nichicon и
              Elna, резисторы Vishay, транзисторы оригинальной маркировки.
              Никаких китайских «аналогов» в сигнальном тракте.
            </p>
          </div>
          <div className={styles.bioPhotoWrap}>
            <div className={styles.bioPhoto}>
              <span className={styles.photoLabel}>РАБОЧЕЕ МЕСТО</span>
            </div>
            <div className={styles.bioAccent}>
              <span className={styles.bioAccentNum}>2009</span>
              <span className={styles.bioAccentLabel}>год начала работы</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Stats ──────────────────────────────────────────────────────────── */}
      <section className={styles.stats}>
        <Container>
          <StatsSection items={stats} />
        </Container>
      </section>

      {/* ─── Skills ─────────────────────────────────────────────────────────── */}
      <section className={styles.skills}>
        <Container>
          <p className={styles.eyebrowLight}>СПЕЦИАЛИЗАЦИЯ</p>
          <h2 className={styles.skillsTitle}>ЧТО Я РЕМОНТИРУЮ</h2>
          <SkillsGrid items={skills} />
        </Container>
      </section>

      {/* ─── Process photo ──────────────────────────────────────────────────── */}
      <section className={styles.process}>
        <div className={styles.processPhoto}>
          <Image
            src="/images/hero.webp"
            alt="Процесс ремонта"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.processOverlay} />
          <p className={styles.processCaption}>ЗА РАБОТОЙ</p>
        </div>
        <div className={styles.processContent}>
          <p className={styles.eyebrowDark}>КАК Я РАБОТАЮ</p>
          <h2 className={styles.processTitle}>ПРИНЦИПЫ</h2>
          <PrinciplesSection />
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <Container className={styles.ctaInner}>
          <div>
            <h2 className={styles.ctaTitle}>ЕСТЬ АППАРАТ НА РЕМОНТ?</h2>
            <p className={styles.ctaSub}>
              Опишите проблему — скажу, можно ли починить и сколько это стоит.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Button
              variant="primary"
              size="lg"
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
            >
              ПОЗВОНИТЬ
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/#contacts"
              className={styles.btnDark}
            >
              НАПИСАТЬ
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
      <RepairRequestModal />
    </>
  )
}
