import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

import type { PropsWithClassName } from '@/shared/types'

import styles from './Button.module.scss'

type ButtonOwnProps = PropsWithClassName & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonOwnProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonOwnProps> & {
    href: string
  }

type Props = ButtonAsButton | ButtonAsLink

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...rest
}: Props) {
  const classes = [
    styles.root,
    styles[variant],
    styles[size],
    className ?? '',
  ].join(' ')

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as ComponentPropsWithoutRef<typeof Link>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      {...(rest as ComponentPropsWithoutRef<'button'>)}
    >
      {children}
    </button>
  )
}
