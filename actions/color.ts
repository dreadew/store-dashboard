'use server'

import { ColorResponse, ColorsResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createColorSchema, updateColorSchema } from '../schemas'

export const createColor = async (
	values: z.infer<typeof createColorSchema>,
	store_id: number
): Promise<ColorResponse> => {
	const { data } = await axios.post('/api/color', {
		store_id,
		...values,
	})
	return data
}

export const updateColor = async (
	values: z.infer<typeof updateColorSchema>,
	store_id: number
): Promise<ColorResponse> => {
	const { data } = await axios.patch('/api/color', {
		store_id,
		...values,
	})
	return data
}

export const deleteColor = async (id: number): Promise<ColorResponse> => {
	const { data } = await axios.delete(`/api/color/${id}`)
	return data
}

export const getColorById = async (id: number): Promise<ColorResponse> => {
	const { data } = await axios.get(`/api/color/${id}`)
	return data
}

export const getColorsByStore = async (
	store_id: number
): Promise<ColorsResponse> => {
	const { data } = await axios.get(`/api/color/by-store/${store_id}`)
	return data
}
