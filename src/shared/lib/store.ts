import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AppStore = {
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
  isRepairModalOpen: boolean
  openRepairModal: () => void
  closeRepairModal: () => void
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      isMenuOpen: false,
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      isRepairModalOpen: false,
      openRepairModal: () => set({ isRepairModalOpen: true }),
      closeRepairModal: () => set({ isRepairModalOpen: false }),
    }),
    { name: 'AppStore' }
  )
)
