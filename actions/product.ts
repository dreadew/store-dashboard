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
