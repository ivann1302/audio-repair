import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/),
  equipment: z.string().min(3),
  problem: z.string().optional(),
  _honeypot: z.string().max(0),
})

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const { name, phone, equipment, problem } = parsed.data

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (token && chatId) {
    const text = [
      '🔧 *Новая заявка на ремонт*',
      `👤 Имя: ${name}`,
      `📞 Телефон: ${phone}`,
      `🎛 Техника: ${equipment}`,
      problem ? `📝 Проблема: ${problem}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    })
  }

  return NextResponse.json({ success: true })
}
