import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/),
  equipment: z.string().min(3),
  problem: z.string().optional(),
  _honeypot: z.string(),
})

export async function POST(request: Request) {
  const body: unknown = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const { name, phone, equipment, problem, _honeypot } = parsed.data

  // honeypot — бот заполнил скрытое поле, тихо игнорируем
  if (_honeypot) {
    return NextResponse.json({ success: true })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatIdsRaw =
    process.env.TELEGRAM_CHAT_IDS ?? process.env.TELEGRAM_CHAT_ID

  if (!token || !chatIdsRaw) {
    console.error(
      '[contact] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_IDS is not set'
    )
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const chatIds = chatIdsRaw
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  const sentAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const referer = request.headers.get('referer') ?? ''
  const page = referer ? new URL(referer).pathname : '—'

  const text = [
    '🔧 <b>Новая заявка на ремонт</b>',
    `👤 <b>Имя:</b> ${name}`,
    `📞 <b>Телефон:</b> ${phone}`,
    `🎛 <b>Техника:</b> ${equipment}`,
    problem ? `📝 <b>Проблема:</b> ${problem}` : null,
    ``,
    `🕐 <b>Время:</b> ${sentAt} (МСК)`,
    `🌐 <b>Страница:</b> ${page}`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  const results = await Promise.allSettled(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      }).then((res) => {
        if (!res.ok) throw new Error(`chat ${chatId}: ${res.status}`)
        return res
      })
    )
  )

  const failed = results.filter((r) => r.status === 'rejected')
  if (failed.length > 0) {
    failed.forEach((r) =>
      console.error(
        '[contact] Telegram error:',
        (r as PromiseRejectedResult).reason
      )
    )
  }

  if (failed.length === chatIds.length) {
    return NextResponse.json({ error: 'Telegram error' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
