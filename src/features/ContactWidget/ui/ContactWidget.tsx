'use client'

import { useEffect, useState } from 'react'

import styles from './ContactWidget.module.scss'

const contacts = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/79991234567',
    bg: '#25D366',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.117 1.527 5.845L.057 23.571l5.888-1.542A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.006-1.374l-.36-.214-3.714.973.992-3.621-.234-.372A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
      </svg>
    ),
  },
  {
    id: 'max',
    label: 'MAX',
    href: 'https://max.ru',
    bg: 'transparent',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/MAX.svg" alt="" className={styles.maxIcon} />
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/username',
    bg: '#229ED9',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Позвонить',
    href: 'tel:+79991234567',
    bg: '#F0B429',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
]

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
    <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

export function ContactWidget() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      setVisible(false)
      setOpen(false)
      clearTimeout(timer)
      timer = setTimeout(() => setVisible(true), 600)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className={`${styles.root} ${visible ? styles.rootVisible : styles.rootHidden}`}
    >
      <ul
        className={`${styles.list} ${open ? styles.listOpen : ''}`}
        aria-hidden={!open}
      >
        {contacts.map((contact, i) => (
          <li
            key={contact.id}
            className={styles.item}
            style={{
              transitionDelay: open
                ? `${(contacts.length - 1 - i) * 55}ms`
                : '0ms',
            }}
          >
            <a
              href={contact.href}
              className={`${styles.link} ${contact.bg === 'transparent' ? styles.linkBare : ''}`}
              style={
                contact.bg !== 'transparent'
                  ? { background: contact.bg }
                  : undefined
              }
              aria-label={contact.label}
              tabIndex={open ? 0 : -1}
            >
              {contact.icon}
            </a>
            <span className={styles.tooltip}>{contact.label}</span>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Закрыть меню контактов' : 'Открыть меню контактов'}
        aria-expanded={open}
      >
        <span
          className={`${styles.iconWrap} ${open ? styles.iconWrapOpen : ''}`}
        >
          <ChatIcon />
        </span>
        <span
          className={`${styles.iconWrap} ${styles.iconWrapClose} ${open ? styles.iconWrapCloseOpen : ''}`}
        >
          <CloseIcon />
        </span>
      </button>
    </div>
  )
}
