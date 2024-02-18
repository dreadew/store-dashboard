import { create } from 'zustand'

interface useSizeModal {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useSizeModal = create<useSizeModal>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
