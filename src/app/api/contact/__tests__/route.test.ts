/**
 * @jest-environment node
 */
import { POST } from '../route'

const makeRequest = (body: unknown, referer?: string) =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(referer ? { referer } : {}),
    },
    body: JSON.stringify(body),
  })

const validBody = {
  name: 'Александр',
  phone: '+7 (999) 999-99-99',
  equipment: 'Усилитель Marantz',
  _honeypot: '',
}

const okFetch = jest.fn().mockResolvedValue(new Response('{}', { status: 200 }))
const failFetch = jest
  .fn()
  .mockResolvedValue(new Response('Bad Request', { status: 400 }))

beforeEach(() => {
  jest.clearAllMocks()
  process.env.TELEGRAM_BOT_TOKEN = 'test-token'
  process.env.TELEGRAM_CHAT_IDS = '111'
  delete process.env.TELEGRAM_CHAT_ID
})

afterEach(() => {
  delete process.env.TELEGRAM_BOT_TOKEN
  delete process.env.TELEGRAM_CHAT_IDS
  delete process.env.TELEGRAM_CHAT_ID
})

describe('POST /api/contact', () => {
  describe('валидация входных данных', () => {
    it('возвращает 400 при отсутствии обязательных полей', async () => {
      global.fetch = okFetch
      const res = await POST(makeRequest({}))
      expect(res.status).toBe(400)
      expect(await res.json()).toEqual({ error: 'Invalid data' })
    })

    it('возвращает 400 при слишком коротком имени', async () => {
      global.fetch = okFetch
      const res = await POST(makeRequest({ ...validBody, name: 'А' }))
      expect(res.status).toBe(400)
    })

    it('возвращает 400 при невалидном телефоне', async () => {
      global.fetch = okFetch
      const res = await POST(
        makeRequest({ ...validBody, phone: '89991234567' })
      )
      expect(res.status).toBe(400)
    })

    it('возвращает 400 при слишком короткой технике', async () => {
      global.fetch = okFetch
      const res = await POST(makeRequest({ ...validBody, equipment: 'АВ' }))
      expect(res.status).toBe(400)
    })
  })

  describe('honeypot', () => {
    it('тихо возвращает success при заполненном honeypot', async () => {
      global.fetch = okFetch
      const res = await POST(makeRequest({ ...validBody, _honeypot: 'spam' }))
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({ success: true })
      expect(okFetch).not.toHaveBeenCalled()
    })
  })

  describe('конфигурация сервера', () => {
    it('возвращает 500 если не задан TELEGRAM_BOT_TOKEN', async () => {
      global.fetch = okFetch
      delete process.env.TELEGRAM_BOT_TOKEN
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(500)
      expect(await res.json()).toEqual({ error: 'Server misconfigured' })
    })

    it('возвращает 500 если не заданы ни TELEGRAM_CHAT_IDS ни TELEGRAM_CHAT_ID', async () => {
      global.fetch = okFetch
      delete process.env.TELEGRAM_CHAT_IDS
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(500)
    })

    it('работает с устаревшей переменной TELEGRAM_CHAT_ID', async () => {
      global.fetch = okFetch
      delete process.env.TELEGRAM_CHAT_IDS
      process.env.TELEGRAM_CHAT_ID = '222'
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({ success: true })
    })
  })

  describe('отправка в Telegram', () => {
    it('успешно отправляет в один чат', async () => {
      global.fetch = okFetch
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({ success: true })
      expect(okFetch).toHaveBeenCalledTimes(1)
      expect(okFetch).toHaveBeenCalledWith(
        expect.stringContaining('api.telegram.org/bot'),
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('отправляет в несколько чатов параллельно', async () => {
      global.fetch = okFetch
      process.env.TELEGRAM_CHAT_IDS = '111,222,333'
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({ success: true })
      expect(okFetch).toHaveBeenCalledTimes(3)
    })

    it('возвращает success при частичной ошибке (часть чатов недоступна)', async () => {
      let callCount = 0
      global.fetch = jest.fn().mockImplementation(() => {
        callCount++
        const ok = callCount === 1
        return Promise.resolve(new Response('', { status: ok ? 200 : 400 }))
      })
      process.env.TELEGRAM_CHAT_IDS = '111,222'
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(200)
      expect(await res.json()).toEqual({ success: true })
    })

    it('возвращает 502 если все чаты вернули ошибку', async () => {
      global.fetch = failFetch
      process.env.TELEGRAM_CHAT_IDS = '111,222'
      const res = await POST(makeRequest(validBody))
      expect(res.status).toBe(502)
      expect(await res.json()).toEqual({ error: 'Telegram error' })
    })

    it('включает имя, телефон и технику в тело сообщения', async () => {
      global.fetch = okFetch
      await POST(makeRequest(validBody))
      const opts = (okFetch.mock.calls[0] as [string, RequestInit])[1]
      const body = JSON.parse(opts.body as string)
      expect(body.text).toContain('Александр')
      expect(body.text).toContain('+7 (999) 999-99-99')
      expect(body.text).toContain('Усилитель Marantz')
    })

    it('включает поле «Проблема» если оно передано', async () => {
      global.fetch = okFetch
      await POST(makeRequest({ ...validBody, problem: 'Не включается' }))
      const opts = (okFetch.mock.calls[0] as [string, RequestInit])[1]
      const body = JSON.parse(opts.body as string)
      expect(body.text).toContain('Не включается')
    })

    it('не включает поле «Проблема» если оно не передано', async () => {
      global.fetch = okFetch
      await POST(makeRequest(validBody))
      const opts = (okFetch.mock.calls[0] as [string, RequestInit])[1]
      const body = JSON.parse(opts.body as string)
      expect(body.text).not.toContain('Проблема')
    })

    it('включает путь страницы из заголовка Referer', async () => {
      global.fetch = okFetch
      await POST(makeRequest(validBody, 'http://localhost/services'))
      const opts = (okFetch.mock.calls[0] as [string, RequestInit])[1]
      const body = JSON.parse(opts.body as string)
      expect(body.text).toContain('/services')
    })

    it('использует parse_mode HTML', async () => {
      global.fetch = okFetch
      await POST(makeRequest(validBody))
      const opts = (okFetch.mock.calls[0] as [string, RequestInit])[1]
      const body = JSON.parse(opts.body as string)
      expect(body.parse_mode).toBe('HTML')
    })
  })
})
