import Link from 'next/link'

import { SectionTitle } from '@/shared/ui'

import styles from './MasterSection.module.scss'

const achievements = [
  '15 лет опыта ремонта аудиотехники',
  'Работа с техникой Hi-Fi и Hi-End класса',
  'Гарантия на все виды работ',
  'Оригинальные и проверенные аналоговые компоненты',
  'Бесплатная диагностика перед ремонтом',
]

export function MasterSection() {
  return (
    <section className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.photo} aria-hidden>
          <span className={styles.photoPlaceholder}>ФОТО</span>
        </div>

        <div className={styles.content}>
          <SectionTitle eyebrow="О МАСТЕРЕ" title="АЛЕКСЕЙ МОРОЗОВ" />

          <p className={styles.bio}>
            Занимаюсь ремонтом аудиотехники с 2009 года. Специализируюсь на
            отечественной и импортной аппаратуре — от советских усилителей до
            современных AV-ресиверов. Каждый аппарат получает индивидуальный
            подход: диагностика, подбор компонентов и настройка под
            характеристики именно этой модели.
          </p>

          <ul className={styles.achievements}>
            {achievements.map((item) => (
              <li key={item} className={styles.achievementItem}>
                <span className={styles.bullet} aria-hidden>
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link href="/master" className={styles.moreLink}>
            Подробнее о мастере →
          </Link>
        </div>
      </div>
    </section>
  )
}
