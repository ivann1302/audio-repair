import styles from './AboutSection.module.scss'

const stats = [
  { value: '1400+', label: 'Отремонтировано аппаратов' },
  { value: '6 МЕС', label: 'Гарантия на все работы' },
  { value: '0 ₽', label: 'Диагностика' },
]

export function AboutSection() {
  return (
    <section className={styles.root}>
      <div className={styles.photo} aria-hidden>
        <span className={styles.photoPlaceholder}>ФОТО</span>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden /> О МАСТЕРЕ
          </p>
          <h2 className={styles.title}>
            27 ЛЕТ
            <br />
            ПРАКТИКИ
          </h2>
          <p className={styles.bio}>
            Начинал в 1997-м — чинил «Радиотехнику» и «Вегу» для соседей.
            Сегодня работаю с Luxman, Esam, Tandis и с советской классикой.
            Каждый аппарат — отдельная история.
          </p>
        </div>

        <ul className={styles.stats}>
          {stats.map((stat) => (
            <li key={stat.value} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
