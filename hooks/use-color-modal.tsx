import { create } from 'zustand'

interface useColorModal {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useColorModal = create<useColorModal>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
