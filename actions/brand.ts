'use server'

import { BrandResponse, BrandsResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createBrandSchema, updateBrandSchema } from '../schemas'

export const createBrand = async (
	values: z.infer<typeof createBrandSchema>
): Promise<BrandResponse> => {
	try {
		const { data } = await axios.post('/api/brand', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const updateBrand = async (
	values: z.infer<typeof updateBrandSchema>
): Promise<BrandResponse> => {
	try {
		const { data } = await axios.patch('/api/brand', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const deleteBrand = async (id: number): Promise<BrandResponse> => {
	try {
		const { data } = await axios.delete(`/api/brand/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getBrandById = async (id: number): Promise<BrandResponse> => {
	try {
		const { data } = await axios.get(`/api/brand/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getBrands = async (): Promise<BrandsResponse> => {
	try {
		const { data } = await axios.get(`/api/brand`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
