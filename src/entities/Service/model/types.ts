import type { IconName } from '@/shared/ui'

export type Service = {
  id: string
  title: string
  description: string
  priceFrom: number
  icon: IconName
  slug: string
}
