'use server'

import { ProductResponse, ProductsResponse } from '@/types/types.dto'
import axios from '../core/axios'

export const createProduct = async (
	values: FormData
): Promise<ProductResponse> => {
	const { data } = await axios.post('/api/product', values)
	return data
}

export const updateProduct = async (
	values: FormData
): Promise<ProductResponse> => {
	const { data } = await axios.patch('/api/product', values)
	return data
}

export const deleteProduct = async (id: number): Promise<ProductResponse> => {
	const { data } = await axios.delete(`/api/product/${id}`)
	return data
}

export const getProductById = async (id: number): Promise<ProductResponse> => {
	const { data } = await axios.get(`/api/product/${id}`)
	return data
}

export const getProductByColorId = async (
	id: number
): Promise<ProductsResponse> => {
	const { data } = await axios.get(`/api/product/by-color/${id}`)
	return data
}

export const getProductByCategoryId = async (
	id: number
): Promise<ProductsResponse> => {
	const { data } = await axios.get(`/api/product/by-category/${id}`)
	return data
}

export const getProductBySizeId = async (
	id: number
): Promise<ProductsResponse> => {
	const { data } = await axios.get(`/api/product/by-size/${id}`)
	return data
}

export const getProductByStoreId = async (
	id: number
): Promise<ProductsResponse> => {
	const { data } = await axios.get(`/api/product/by-store/${id}`)
	return data
}

export const getAvailableProductByStoreId = async (
	id: number
): Promise<ProductsResponse> => {
	const { data } = await axios.get(`/api/product/by-store/${id}/available`)
	return data
}

export const getAvailableExtendedProductByStoreId = async (
	id: number
): Promise<ProductsResponse> => {
	const { data } = await axios.get(`/api/product/by-store/${id}/available`)
	return data
}
