import styles from './AccentCTA.module.scss'

export function AccentCTA() {
  return (
    <section className={styles.root}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden />
          НЕ ВЫБРАСЫВАЙТЕ — РЕМОНТИРУЙТЕ
        </p>
        <h2 className={styles.title}>
          ТЕХНИКА
          <br />
          ЗАСЛУЖИВАЕТ
          <br />
          ВТОРОЙ ЖИЗНИ
        </h2>
      </div>

      <div className={styles.right}>
        <p className={styles.description}>
          Привезите аппарат или опишите проблему по телефону. Диагностика —
          бесплатно. Работаем без выходных.
        </p>
        <a href="/contact" className={styles.button}>
          ОСТАВИТЬ ЗАЯВКУ →
        </a>
      </div>
    </section>
  )
}
