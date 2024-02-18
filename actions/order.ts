import { OrderResponse } from '@/types/types.dto'
import axios from '../core/axios'

export const createOrder = async (values: any): Promise<OrderResponse> => {
	const { data } = await axios.post('/api/order', values)
	return data
}

export const updateOrderStatus = async (
	values: any
): Promise<OrderResponse> => {
	const { data } = await axios.patch('/api/order', values)
	return data
}
