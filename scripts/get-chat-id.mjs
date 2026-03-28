/**
 * Запусти: node scripts/get-chat-id.mjs
 * Затем напиши своему боту любое сообщение.
 * Бот ответит твоим Chat ID прямо в Telegram.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// читаем .env.local
let token = process.env.TELEGRAM_BOT_TOKEN
if (!token) {
  try {
    const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
    const match = env.match(/TELEGRAM_BOT_TOKEN=(.+)/)
    if (match) token = match[1].trim()
  } catch {}
}

if (!token) {
  console.error('❌  Добавь TELEGRAM_BOT_TOKEN в .env.local')
  process.exit(1)
}

const api = (method) => `https://api.telegram.org/bot${token}/${method}`

console.log('⏳  Жду сообщение боту...')

let offset = 0

const poll = async () => {
  while (true) {
    const res = await fetch(`${api('getUpdates')}?offset=${offset}&timeout=30`)
    const { ok, result } = await res.json()

    if (!ok || !result.length) continue

    for (const update of result) {
      offset = update.update_id + 1
      const chatId = update.message?.chat?.id
      const firstName = update.message?.chat?.first_name ?? ''

      if (!chatId) continue

      console.log(`\n✅  Chat ID: ${chatId}`)
      console.log(`    Добавь в .env.local:\n    TELEGRAM_CHAT_ID=${chatId}\n`)

      // отвечаем боту прямо в Telegram
      await fetch(api('sendMessage'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `👋 ${firstName}, твой Chat ID:\n\n<code>${chatId}</code>\n\nДобавь в .env.local:\nTELEGRAM_CHAT_ID=${chatId}`,
          parse_mode: 'HTML',
        }),
      })

      process.exit(0)
    }
  }
}

poll().catch((err) => {
  console.error('❌ Ошибка:', err.message)
  process.exit(1)
})
