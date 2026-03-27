'use client'

import { useState } from 'react'

import { useForm, zodResolver } from '@/shared/lib/form'
import { Button } from '@/shared/ui'

import { repairRequestSchema } from '../model/schema'
import type { RepairRequestFields } from '../model/schema'

import styles from './RepairRequestForm.module.scss'

export function RepairRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RepairRequestFields>({
    resolver: zodResolver(repairRequestSchema),
    defaultValues: { _honeypot: '' },
  })

  const onSubmit = async (data: RepairRequestFields) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setServerError('Не удалось отправить заявку. Позвоните нам напрямую.')
    }
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>◎</span>
        <p className={styles.successTitle}>ЗАЯВКА ПРИНЯТА</p>
        <p className={styles.successText}>
          Свяжемся с вами в течение 30 минут в рабочее время.
        </p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* honeypot — скрытое поле от спама */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className={styles.honeypot}
        {...register('_honeypot')}
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rr-name">
          ИМЯ
        </label>
        <input
          id="rr-name"
          className={[styles.input, errors.name ? styles.inputError : ''].join(
            ' '
          )}
          type="text"
          placeholder="Александр"
          autoComplete="name"
          {...register('name')}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rr-phone">
          ТЕЛЕФОН
        </label>
        <input
          id="rr-phone"
          className={[styles.input, errors.phone ? styles.inputError : ''].join(
            ' '
          )}
          type="tel"
          placeholder="+7 (999) 999-99-99"
          autoComplete="tel"
          {...register('phone')}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rr-equipment">
          ТЕХНИКА
        </label>
        <input
          id="rr-equipment"
          className={[
            styles.input,
            errors.equipment ? styles.inputError : '',
          ].join(' ')}
          type="text"
          placeholder="Усилитель Marantz PM6007"
          {...register('equipment')}
        />
        {errors.equipment && (
          <span className={styles.error}>{errors.equipment.message}</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rr-problem">
          ПРОБЛЕМА <span className={styles.optional}>(необязательно)</span>
        </label>
        <textarea
          id="rr-problem"
          className={styles.textarea}
          placeholder="Опишите неисправность..."
          rows={3}
          {...register('problem')}
        />
      </div>

      {serverError && <p className={styles.serverError}>{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={styles.submit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
      </Button>
    </form>
  )
}
