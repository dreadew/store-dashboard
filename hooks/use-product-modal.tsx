import { create } from 'zustand'

interface useProductsModal {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useProductModal = create<useProductsModal>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
