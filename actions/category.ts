'use server'

import { CategoriesResponse, CategoryResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createCategorySchema, updateCategorySchema } from '../schemas'

export const createCategory = async (
	values: z.infer<typeof createCategorySchema>,
	store_id: number
): Promise<CategoryResponse> => {
	const { data } = await axios.post('/api/category', {
		store_id,
		...values,
	})
	return data
}

export const updateCategory = async (
	values: z.infer<typeof updateCategorySchema>,
	store_id: number
): Promise<CategoryResponse> => {
	const { data } = await axios.patch('/api/category', {
		store_id,
		...values,
	})
	return data
}

export const deleteCategory = async (id: number): Promise<CategoryResponse> => {
	const { data } = await axios.delete(`/api/category/${id}`)
	return data
}

export const getCategoryById = async (
	id: number
): Promise<CategoryResponse> => {
	const { data } = await axios.get(`/api/category/${id}`)
	return data
}

export const getCategoriesByStore = async (
	store_id: number
): Promise<CategoriesResponse> => {
	const { data } = await axios.get(`/api/category/by-store/${store_id}`)
	return data
}
