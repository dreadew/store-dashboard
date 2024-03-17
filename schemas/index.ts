import * as z from 'zod'

export const SignInSchema = z.object({
	email: z.string().email({
		message: 'email is required',
	}),
	password: z.string().min(6, {
		message: 'password must be at least 6 characters',
	}),
})

export const createProductSchema = z.object({
	name: z.string(),
	price: z.string(),
	category_id: z.string(),
	size_id: z.string(),
	color_id: z.string(),
	images: z.string(),
})

export const SignUpSchema = z.object({
	email: z.string().email({
		message: 'email is required',
	}),
	password: z.string().min(6, {
		message: 'password must be at least 6 characters',
	}),
	username: z.string().min(6, {
		message: 'username must be at least 6 characters',
	}),
})

export const createCategorySchema = z.object({
	name: z.string().min(4, {
		message: 'category must be at least 4 characters',
	}),
})

export const updateCategorySchema = z.object({
	name: z.string().min(4, {
		message: 'category must be at least 4 characters',
	}),
})

export const createBrandSchema = z.object({
	name: z.string().min(4, {
		message: 'brand must be at least 4 characters',
	}),
})

export const updateBrandSchema = z.object({
	name: z.string().min(4, {
		message: 'brand must be at least 4 characters',
	}),
})

export const createColorSchema = z.object({
	name: z.string().min(4, {
		message: 'color must be at least 4 characters',
	}),
	value: z.string().min(3, {
		message: 'color must be at least 3 characters',
	}),
})

export const updateColorSchema = z.object({
	name: z.string().min(4, {
		message: 'color must be at least 4 characters',
	}),
	value: z.string().min(3, {
		message: 'color must be at least 3 characters',
	}),
})

export const createSizeSchema = z.object({
	name: z.string().min(1, {
		message: 'size must be at least 1 characters',
	}),
	value: z.string().min(1, {
		message: 'size must be at least 1 characters',
	}),
})

export const updateSizeSchema = z.object({
	name: z.string().min(4, {
		message: 'size must be at least 4 characters',
	}),
	value: z.string().min(1, {
		message: 'size must be at least 1 characters',
	}),
})

export const createOrderSchema = z.object({
	name: z.string().min(4, {
		message: 'size must be at least 4 characters',
	}),
	value: z.string().min(1, {
		message: 'size must be at least 1 characters',
	}),
})
