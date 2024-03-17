'use server'

import { ProductResponse, ProductsResponse } from '@/types/types.dto'
import axios from '../core/axios'

export const createProduct = async (
	values: FormData
): Promise<ProductResponse> => {
	try {
		const { data } = await axios.post('/api/product', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const updateProduct = async (
	values: FormData
): Promise<ProductResponse> => {
	try {
		const { data } = await axios.patch('/api/product', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const deleteProduct = async (id: number): Promise<ProductResponse> => {
	try {
		const { data } = await axios.delete(`/api/product/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProductById = async (id: number): Promise<ProductResponse> => {
	try {
		const { data } = await axios.get(`/api/product/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProductByColorId = async (
	id: number
): Promise<ProductsResponse> => {
	try {
		const { data } = await axios.get(`/api/product/by-color/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProductByCategoryId = async (
	id: number
): Promise<ProductsResponse> => {
	try {
		const { data } = await axios.get(`/api/product/by-category/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProductBySizeId = async (
	id: number
): Promise<ProductsResponse> => {
	try {
		const { data } = await axios.get(`/api/product/by-size/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProductsByBrandId = async (
	id: number
): Promise<ProductsResponse> => {
	try {
		const { data } = await axios.get(`/api/product/by-brand/${id}`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProductsWithFilters = async (d: {
	category_id: number | null
	brand_id: number | null
	size_id: number | null
	color_id: number | null
}): Promise<ProductsResponse> => {
	try {
		const params = new URLSearchParams({
			category_id: String(d.category_id) || '',
			brand_id: String(d.brand_id) || '',
			size_id: String(d.size_id) || '',
			color_id: String(d.color_id) || '',
		})
		const { data } = await axios.get(
			`/api/product/all/with-filters?` + params.toString()
		)
		console.log(params.toString())
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getProducts = async (): Promise<ProductsResponse> => {
	try {
		const { data } = await axios.get(`/api/product`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const getAvailableProducts = async (): Promise<ProductsResponse> => {
	try {
		const { data } = await axios.get(`/api/product/all/available`)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
