'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { PropsWithClassName } from '@/shared/types'

import styles from './Header.module.scss'

const NAV_LINKS = [
  { href: '/#services', label: 'УСЛУГИ' },
  { href: '/#master', label: 'О МАСТЕРЕ' },
  { href: '/blog', label: 'БЛОГ' },
  { href: '/#contacts', label: 'КОНТАКТЫ' },
]

type Props = PropsWithClassName

export function Header({ className }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`${styles.root} ${className ?? ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>◎</span>
          <span className={styles.logoText}>AUDIO REPAIR</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a href="tel:+79001234567" className={styles.phone}>
            +7 (900) 123-45-67
          </a>
          <Link
            href="/#contacts"
            className={styles.cta}
            onClick={() => setMenuOpen(false)}
          >
            ЗАЯВКА
          </Link>
        </nav>

        <button
          className={styles.burger}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineTop : ''}`}
          />
          <span
            className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineMid : ''}`}
          />
          <span
            className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineBot : ''}`}
          />
        </button>
      </div>
    </header>
  )
}
