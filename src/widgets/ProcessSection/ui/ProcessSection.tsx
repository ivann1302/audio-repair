import { Container } from '@/shared/ui'

import styles from './ProcessSection.module.scss'

const steps = [
  {
    id: '1',
    title: 'ЗАЯВКА',
    description:
      'Позвоните или напишите. Опишите проблему — сразу скажу, можно ли починить и примерную стоимость.',
  },
  {
    id: '2',
    title: 'ДИАГНОСТИКА',
    description:
      'Дигностика занимает от 1 до 3 дней. После чего вы получаете фиксированную стоимость ремонта. Стоимость диагностики 1500 рублей, она является одним из самых трудоемких этапов работ и входит в стоимость ремонта.',
  },
  {
    id: '3',
    title: 'РЕМОНТ\nИ ВЫДАЧА',
    description:
      'Ремонтирую в срок. Даю гарантию 6 месяцев на все виды работ. Выезд и доставка обгвариваются отдельно.',
  },
]

export function ProcessSection() {
  return (
    <section className={styles.root}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>КАК МЫ РАБОТАЕМ</h2>
          <p className={styles.tagline}>
            От заявки до готового аппарата — 3 шага
          </p>
        </div>
      </Container>

      <ul className={styles.grid}>
        {steps.map((step, index) => (
          <li key={step.id} className={styles.card}>
            <span className={styles.number}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.cardTitle}>
              {step.title.split('\n').map((line, i) => (
                <span key={i} className={styles.titleLine}>
                  {line}
                </span>
              ))}
            </h3>
            <p className={styles.cardDescription}>{step.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
