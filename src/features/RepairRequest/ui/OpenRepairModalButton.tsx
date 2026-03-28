'use client'

import type { PropsWithChildren } from 'react'

import { useAppStore } from '@/shared/lib/store'
import type { PropsWithClassName } from '@/shared/types'
import { Button } from '@/shared/ui'

type Props = PropsWithChildren &
  PropsWithClassName & {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }

export function OpenRepairModalButton({ children, ...props }: Props) {
  const openRepairModal = useAppStore((s) => s.openRepairModal)
  return (
    <Button {...props} onClick={openRepairModal}>
      {children}
    </Button>
  )
}
