'use client'

import { useAppStore } from '@/shared/lib/store'
import { Modal } from '@/shared/ui'

import { RepairRequestForm } from './RepairRequestForm'

export function RepairRequestModal() {
  const isOpen = useAppStore((s) => s.isRepairModalOpen)
  const onClose = useAppStore((s) => s.closeRepairModal)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="ОСТАВИТЬ ЗАЯВКУ">
      <RepairRequestForm />
    </Modal>
  )
}
