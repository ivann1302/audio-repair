import { services } from '@/entities/Service'
import { Container } from '@/shared/ui'

import styles from './ServicesSection.module.scss'

export function ServicesSection() {
  return (
    <section className={styles.root}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>ЧТО МЫ РЕМОНТИРУЕМ</h2>
          <p className={styles.tagline}>
            Работаю с отечественной и иностранной техникой
          </p>
        </div>

        <ul className={styles.grid}>
          {services.map((service, index) => (
            <li key={service.id} className={styles.card}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <a href="/services" className={styles.allLink}>
            Все услуги →
          </a>
        </div>
      </Container>
    </section>
  )
}
