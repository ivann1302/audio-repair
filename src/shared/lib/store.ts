import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Пример глобального стора — расширяй по необходимости
type AppStore = {
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      isMenuOpen: false,
      setMenuOpen: (open) => set({ isMenuOpen: open }),
    }),
    { name: 'AppStore' }
  )
)
