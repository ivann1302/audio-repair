import type { Metadata } from 'next'
import Image from 'next/image'

import { RepairRequestModal } from '@/features/RepairRequest'
import { siteConfig } from '@/shared/config/seo'
import { Button, Container } from '@/shared/ui'
import { AccentCTA } from '@/widgets/AccentCTA'
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
  { value: '35', label: 'лет опыта' },
  { value: '5000+', label: 'отремонтированных аппаратов' },
  { value: '6', label: 'месяцев гарантии на работы' },
  { value: '1500 ₽', label: 'диагностика' },
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
    title: 'CD/DVD ПРОИГРЫВАТЕЛИ',
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
            <h1 className={styles.heroName}>АЛЕКСЕЙ КУЗЬМИН</h1>
            <p className={styles.heroSub}>
              Ремонт аудиотехники и видеоаппаратуры с 1991 года.
              <br />
              Занимаюсь ремонтом любой сложности.
              <br />
              Диагностика 1500 ₽.
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
              alt="Алексей Кузьмин — мастер по ремонту аудиотехники и видеоаппаратуры"
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
              Работаю один, без посредников и раздутого штата — только выездная
              диагностика по договоренности и работа дома. Это позволяет уделять
              каждому аппарату столько времени, сколько нужно. Не конвейер. За
              работы отвечаю своим имен. Именно по этой причине ремонт у меня
              выйдет дешевле, чем в больших мастерских.
            </p>
            <p className={styles.bioPara}>
              Использую только проверенные компоненты у проверенных поставщиков.
              Занимаюсь подбором самостоятельно, что позволяет дать гарантии на
              работы 6 месяцев.
            </p>
          </div>
          <div className={styles.bioPhotoWrap}>
            <div className={styles.bioPhoto}>
              <span className={styles.photoLabel}>РАБОЧЕЕ МЕСТО</span>
            </div>
            <div className={styles.bioAccent}>
              <span className={styles.bioAccentNum}>1991</span>
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

      <AccentCTA />

      <Footer />
      <RepairRequestModal />
    </>
  )
}
