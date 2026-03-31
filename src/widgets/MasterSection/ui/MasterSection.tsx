import { Button, SectionTitle } from '@/shared/ui'

import styles from './MasterSection.module.scss'

const achievements = [
  '35 лет опыта ремонта аудиотехники',
  'Работа с техникой Hi-Fi и Hi-End класса',
  'Гарантия на все виды работ',
  'Надежные проверенные аналоговые компоненты',
  'Диагностика входит в стоимость ремонта',
]

export function MasterSection() {
  return (
    <section className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.photo} aria-hidden>
          <span className={styles.photoPlaceholder}>ФОТО</span>
        </div>

        <div className={styles.content}>
          <SectionTitle eyebrow="О МАСТЕРЕ" title="АЛЕКСЕЙ КУЗЬМИН" />

          <p className={styles.bio}>
            Занимаюсь ремонтом аудиотехники с 1991 года. Имею большой опыт
            работы с отечественной и иностранной техникой. Каждый аппарат
            получает индивидуальный подход: диагностика, подбор компонентов и
            настройка под характеристики именно этой модели.
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

          <Button href="/master" variant="primary" size="lg">
            Подробнее о мастере →
          </Button>
        </div>
      </div>
    </section>
  )
}
