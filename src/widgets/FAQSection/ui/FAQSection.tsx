import { Container } from '@/shared/ui'

import styles from './FAQSection.module.scss'

const faqs = [
  {
    id: '1',
    question: 'Сколько стоит диагностика?',
    answer:
      'Диагностика бесплатная. Вы привозите аппарат, я определяю неисправность и называю точную стоимость ремонта. Без скрытых платежей.',
  },
  {
    id: '2',
    question: 'Какие гарантии вы даёте?',
    answer:
      '6 месяцев на все виды работ. Если в течение гарантийного срока возникнет та же неисправность — устраню бесплатно.',
  },
  {
    id: '3',
    question: 'Как долго длится ремонт?',
    answer:
      'Большинство неисправностей устраняю за 1–3 дня. Сложные случаи — до 7 дней, если требуется заказ редких компонентов. Сроки согласую заранее.',
  },
  {
    id: '4',
    question: 'Вы работаете с советской техникой?',
    answer:
      'Да. Усилители, магнитофоны, проигрыватели — Radiotehnika, Вега, Маяк, Электроника, Корвет и другие. Советская техника хорошо поддаётся ремонту.',
  },
  {
    id: '5',
    question: 'Можно ли отправить аппарат по почте?',
    answer:
      'Да, принимаю технику транспортными компаниями. Свяжитесь со мной заранее — подскажу как правильно упаковать, чтобы ничего не повредить в дороге.',
  },
]

export function FAQSection() {
  return (
    <section className={styles.root}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>ЧАСТЫЕ ВОПРОСЫ</h2>
          <p className={styles.tagline}>Если не нашли ответ — напишите мне.</p>
        </div>

        <ul className={styles.list}>
          {faqs.map((faq) => (
            <li key={faq.id} className={styles.item}>
              <details className={styles.details}>
                <summary className={styles.question}>{faq.question}</summary>
                <p className={styles.answer}>{faq.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
