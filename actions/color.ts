'use server'

import { ColorResponse, ColorsResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createColorSchema, updateColorSchema } from '../schemas'

export const createColor = async (
	values: z.infer<typeof createColorSchema>
): Promise<ColorResponse> => {
	try {
		const { data } = await axios.post('/api/color', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const updateColor = async (
	values: z.infer<typeof updateColorSchema>
): Promise<ColorResponse> => {
	try {
		const { data } = await axios.patch('/api/color', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const deleteColor = async (id: number): Promise<ColorResponse> => {
	try {
		const { data } = await axios.delete(`/api/color/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getColorById = async (id: number): Promise<ColorResponse> => {
	try {
		const { data } = await axios.get(`/api/color/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getColors = async (): Promise<ColorsResponse> => {
	try {
		const { data } = await axios.get(`/api/color`)
		return data
		return data
	} catch (err: any) {
		return err.response.data
	}
}
