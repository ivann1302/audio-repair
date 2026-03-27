import { Container, SectionTitle } from '@/shared/ui'

import styles from './ContactsSection.module.scss'

const contacts = [
  { label: 'Телефон', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
  {
    label: 'Email',
    value: 'master@audio-repair.ru',
    href: 'mailto:master@audio-repair.ru',
  },
  { label: 'Адрес', value: 'Москва, ул. Примерная, д. 1', href: null },
  { label: 'Часы работы', value: 'Пн–Сб: 10:00 – 20:00', href: null },
]

export function ContactsSection() {
  return (
    <section id="contacts" className={styles.root}>
      <Container>
        <SectionTitle eyebrow="КАК НАС НАЙТИ" title="КОНТАКТЫ" />

        <div className={styles.inner}>
          <ul className={styles.list}>
            {contacts.map((item) => (
              <li key={item.label} className={styles.item}>
                <span className={styles.label}>{item.label}</span>
                {item.href ? (
                  <a href={item.href} className={styles.value}>
                    {item.value}
                  </a>
                ) : (
                  <span className={styles.value}>{item.value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.mapWrapper}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A016e6483c5f40e2ab97d8963e45e0b5f47a9ba6b309841028e27d060814ec764&source=constructor"
              className={styles.map}
              title="Карта проезда"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
