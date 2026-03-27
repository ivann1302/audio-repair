import { z } from '@/shared/lib/form'

export const repairRequestSchema = z.object({
  name: z.string().min(2, 'Введите имя (минимум 2 символа)'),
  phone: z
    .string()
    .regex(
      /^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
      'Введите телефон в формате +7 (999) 999-99-99'
    ),
  equipment: z.string().min(3, 'Укажите технику (минимум 3 символа)'),
  problem: z.string().optional(),
  _honeypot: z.string().max(0),
})

export type RepairRequestFields = z.infer<typeof repairRequestSchema>
