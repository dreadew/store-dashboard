'use server'

import { SizeResponse, SizesResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createSizeSchema, updateSizeSchema } from '../schemas'

export const createSize = async (
	values: z.infer<typeof createSizeSchema>
): Promise<SizeResponse> => {
	try {
		const { data } = await axios.post('/api/Size', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const updateSize = async (
	values: z.infer<typeof updateSizeSchema>
): Promise<SizeResponse> => {
	try {
		const { data } = await axios.patch('/api/size', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const deleteSize = async (id: number): Promise<SizeResponse> => {
	try {
		const { data } = await axios.delete(`/api/size/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getSizeById = async (id: number): Promise<SizeResponse> => {
	try {
		const { data } = await axios.get(`/api/size/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getSizes = async (): Promise<SizesResponse> => {
	try {
		const { data } = await axios.get(`/api/size`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
