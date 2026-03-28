import Link from 'next/link'

import styles from './Footer.module.scss'
import { FooterCta } from './FooterCta'

const navLinks = [
  { label: 'Услуги', href: '/services' },
  { label: 'О мастере', href: '/master' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '/#contacts' },
]

const serviceLinks = [
  { label: 'Усилители', href: '/services#amplifiers' },
  { label: 'Виниловые проигрыватели', href: '/services#vinyl' },
  { label: 'Кассетные деки', href: '/services#tape-recorders' },
  { label: 'Тюнеры и ресиверы', href: '/services#receivers' },
  { label: 'CD-проигрыватели', href: '/services#cd-players' },
]

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoSymbol}>◎</span>
            <span className={styles.logoText}>AUDIO REPAIR</span>
          </Link>
          <p className={styles.tagline}>
            Частный мастер. Бережный ремонт
            <br />
            звуковой техники с 2007 года.
          </p>
          <a href="tel:+74951234567" className={styles.phone}>
            +7 (495) 123-45-67
          </a>
          <a href="mailto:master@audiorepair.ru" className={styles.contact}>
            master@audiorepair.ru
          </a>
          <span className={styles.contact}>Москва, м. Таганская</span>
        </div>

        <div className={styles.navGroup}>
          <nav className={styles.nav}>
            <p className={styles.navTitle}>НАВИГАЦИЯ</p>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.nav}>
            <p className={styles.navTitle}>УСЛУГИ</p>
            <ul className={styles.navList}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>
          © 2007–2025 AUDIO REPAIR. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </span>
        <div className={styles.bottomRight}>
          <FooterCta />
          <span className={styles.made}>
            Сделано с уважением к аналоговому звуку
          </span>
        </div>
      </div>
    </footer>
  )
}
