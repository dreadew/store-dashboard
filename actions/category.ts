'use server'

import { CategoriesResponse, CategoryResponse } from '@/types/types.dto'
import * as z from 'zod'
import axios from '../core/axios'
import { createCategorySchema, updateCategorySchema } from '../schemas'

export const createCategory = async (
	values: z.infer<typeof createCategorySchema>
): Promise<CategoryResponse> => {
	try {
		const { data } = await axios.post('/api/category', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const updateCategory = async (
	values: z.infer<typeof updateCategorySchema>
): Promise<CategoryResponse> => {
	try {
		const { data } = await axios.patch('/api/category', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const deleteCategory = async (id: number): Promise<CategoryResponse> => {
	try {
		const { data } = await axios.delete(`/api/category/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getCategoryById = async (
	id: number
): Promise<CategoryResponse> => {
	try {
		const { data } = await axios.get(`/api/category/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getCategories = async (): Promise<CategoriesResponse> => {
	try {
		const { data } = await axios.get(`/api/category`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
