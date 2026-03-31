'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { siteConfig } from '@/shared/config/seo'
import { useAppStore } from '@/shared/lib/store'
import type { PropsWithClassName } from '@/shared/types'
import { Button } from '@/shared/ui'

import styles from './Header.module.scss'

const NAV_LINKS = [
  { href: '/services', label: 'УСЛУГИ' },
  { href: '/master', label: 'О МАСТЕРЕ' },
  { href: '/blog', label: 'БЛОГ' },
  { href: '/#contacts', label: 'КОНТАКТЫ' },
]

type Props = PropsWithClassName

export function Header({ className }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const openRepairModal = useAppStore((s) => s.openRepairModal)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        styles.root,
        scrolled ? styles.scrolled : '',
        className ?? '',
      ].join(' ')}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>◎</span>
          <span className={styles.logoText}>АЛЕКСЕЙ КУЗЬМИН</span>
        </Link>

        <nav
          className={[styles.nav, menuOpen ? styles.navOpen : ''].join(' ')}
          aria-hidden={!menuOpen ? true : undefined}
        >
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
          <a
            href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
            className={styles.phone}
          >
            {siteConfig.phone}
          </a>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setMenuOpen(false)
              openRepairModal()
            }}
          >
            ЗАЯВКА
          </Button>
        </nav>

        <button
          className={styles.burger}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={[
              styles.burgerLine,
              menuOpen ? styles.burgerLineTop : '',
            ].join(' ')}
          />
          <span
            className={[
              styles.burgerLine,
              menuOpen ? styles.burgerLineMid : '',
            ].join(' ')}
          />
          <span
            className={[
              styles.burgerLine,
              menuOpen ? styles.burgerLineBot : '',
            ].join(' ')}
          />
        </button>
      </div>
    </header>
  )
}
