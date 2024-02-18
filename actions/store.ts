'use server'

import { StoreResponse, StoresResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createStoreSchema, updateStoreSchema } from '../schemas'

export const createStore = async (
	user_id: number,
	values: z.infer<typeof createStoreSchema>
): Promise<StoreResponse> => {
	const { data } = await axios.post('/api/store', {
		user_id: user_id,
		name: values.name,
	})
	return data
}

export const updateStore = async (
	values: z.infer<typeof updateStoreSchema>
): Promise<StoreResponse> => {
	const { data } = await axios.patch('/api/store', values)
	return data
}

export const deleteStore = async (store_id: number): Promise<StoreResponse> => {
	const { data } = await axios.delete(`/api/store/${store_id}`)
	return data
}

export const getStoreById = async (
	store_id: number
): Promise<StoreResponse> => {
	const { data } = await axios.get(`/api/store/${store_id}`)
	return data
}

export const getStoresById = async (
	user_id: number
): Promise<StoresResponse> => {
	const { data } = await axios.get(`/api/store/by-user/${user_id}`)
	return data
}

export const getAllStores = async (): Promise<StoresResponse> => {
	const { data } = await axios.get(`/api/store/all`)
	return data
}
