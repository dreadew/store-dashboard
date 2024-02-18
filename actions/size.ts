'use server'

import { SizeResponse, SizesResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createSizeSchema, updateSizeSchema } from '../schemas'

export const createSize = async (
	values: z.infer<typeof createSizeSchema>,
	store_id: number
): Promise<SizeResponse> => {
	const { data } = await axios.post('/api/Size', {
		store_id,
		...values,
	})
	return data
}

export const updateSize = async (
	values: z.infer<typeof updateSizeSchema>,
	store_id: number
): Promise<SizeResponse> => {
	const { data } = await axios.patch('/api/size', {
		store_id,
		...values,
	})
	return data
}

export const deleteSize = async (id: number): Promise<SizeResponse> => {
	const { data } = await axios.delete(`/api/size/${id}`)
	return data
}

export const getSizeById = async (id: number): Promise<SizeResponse> => {
	const { data } = await axios.get(`/api/size/${id}`)
	return data
}

export const getSizesByStore = async (
	store_id: number
): Promise<SizesResponse> => {
	const { data } = await axios.get(`/api/size/by-store/${store_id}`)
	return data
}
