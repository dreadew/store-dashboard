import { ProductCart } from '@/types/types.dto'
import { create } from 'zustand'

interface CartState {
	storeProducts: Record<number, ProductCart[]>
	addProductToCart: (storeId: number, item: ProductCart) => void
	updateProductState: (storeId: number, id: number, val: boolean) => void
	removeProductFromCart: (storeId: number, id: number) => void
}

export const useCartStore = create<CartState>(
	/*persist<CartState>(*/
	(set, get) => ({
		storeProducts: {},
		addProductToCart: (storeId, item) => {
			set(state => {
				const updatedStoreProducts = { ...state.storeProducts }
				if (!updatedStoreProducts[storeId]) {
					updatedStoreProducts[storeId] = []
				}
				updatedStoreProducts[storeId].push(item)
				return { storeProducts: updatedStoreProducts }
			})
		},
		updateProductState: (storeId, id, val) => {
			set(state => {
				const updatedStoreProducts = { ...state.storeProducts }
				if (updatedStoreProducts[storeId]) {
					const productIndex = updatedStoreProducts[storeId].findIndex(
						product => product.ID === id
					)
					if (productIndex !== -1) {
						updatedStoreProducts[storeId][productIndex].active = val
						return { storeProducts: updatedStoreProducts }
					}
				}
				return state
			})
		},
		removeProductFromCart: (storeId, id) => {
			set(state => {
				const updatedStoreProducts = { ...state.storeProducts }
				if (updatedStoreProducts[storeId]) {
					updatedStoreProducts[storeId] = updatedStoreProducts[storeId].filter(
						product => product.ID !== id
					)
					return { storeProducts: updatedStoreProducts }
				}
				return state
			})
		},
	}) /*,
		{
			name: 'cart-items',
		}
	)*/
)
