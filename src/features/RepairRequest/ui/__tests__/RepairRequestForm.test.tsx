import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RepairRequestForm } from '../RepairRequestForm'

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/имя/i), 'Александр')
  await user.type(screen.getByLabelText(/телефон/i), '+7 (999) 999-99-99')
  await user.type(screen.getByLabelText(/техника/i), 'Усилитель Marantz')
}

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('RepairRequestForm', () => {
  describe('рендер', () => {
    it('отображает все поля формы', () => {
      render(<RepairRequestForm />)
      expect(screen.getByLabelText(/имя/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/телефон/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/техника/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/проблема/i)).toBeInTheDocument()
    })

    it('отображает кнопку отправки', () => {
      render(<RepairRequestForm />)
      expect(
        screen.getByRole('button', { name: /отправить заявку/i })
      ).toBeInTheDocument()
    })
  })

  describe('валидация', () => {
    it('показывает ошибку при пустом имени', async () => {
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(screen.getByText(/введите имя/i)).toBeInTheDocument()
      })
    })

    it('показывает ошибку при невалидном телефоне', async () => {
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await user.type(screen.getByLabelText(/имя/i), 'Александр')
      await user.type(screen.getByLabelText(/телефон/i), '123')
      await user.type(screen.getByLabelText(/техника/i), 'Усилитель')
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(screen.getByText(/введите телефон/i)).toBeInTheDocument()
      })
    })

    it('показывает ошибку при слишком короткой технике', async () => {
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await user.type(screen.getByLabelText(/имя/i), 'Александр')
      await user.type(screen.getByLabelText(/телефон/i), '+7 (999) 999-99-99')
      await user.type(screen.getByLabelText(/техника/i), 'АВ')
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(screen.getByText(/укажите технику/i)).toBeInTheDocument()
      })
    })

    it('не отправляет форму при ошибках валидации', async () => {
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(screen.getByText(/введите имя/i)).toBeInTheDocument()
      })
      expect(global.fetch).not.toHaveBeenCalled()
    })
  })

  describe('отправка', () => {
    it('отправляет POST на /api/contact с данными формы', async () => {
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await fillValidForm(user)
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/contact',
          expect.objectContaining({ method: 'POST' })
        )
      })
      const body = JSON.parse(
        (global.fetch as jest.Mock).mock.calls[0][1].body as string
      )
      expect(body.name).toBe('Александр')
      expect(body.phone).toBe('+7 (999) 999-99-99')
      expect(body.equipment).toBe('Усилитель Marantz')
    })

    it('показывает экран успеха после отправки', async () => {
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await fillValidForm(user)
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(screen.getByText(/заявка принята/i)).toBeInTheDocument()
      })
    })

    it('показывает сообщение об ошибке при сбое сервера', async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false })
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await fillValidForm(user)
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(
          screen.getByText(/не удалось отправить заявку/i)
        ).toBeInTheDocument()
      })
    })

    it('показывает сообщение об ошибке при сетевом сбое', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
      const user = userEvent.setup()
      render(<RepairRequestForm />)
      await fillValidForm(user)
      await user.click(
        screen.getByRole('button', { name: /отправить заявку/i })
      )
      await waitFor(() => {
        expect(
          screen.getByText(/не удалось отправить заявку/i)
        ).toBeInTheDocument()
      })
    })
  })
})
