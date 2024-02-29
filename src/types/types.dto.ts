export type ErrorResponse = {
	error: any
}

export type User = {
	ID: number
	username: string
	email: string
	password: string
	token: string
	is_verified: boolean
	role: string
	verification_code: number
	orders: Order[]
}

export type UserResponse = {
	user: User
	errors?: string
}

export type ImageResponse = {
	ID: number
	product_id: number
	url: string
}

export type Category = {
	ID: number
	products: Product[]
	name: string
}

export type CategoryResponse = {
	category: Category
	errors?: string
}

export type CategoriesResponse = {
	categories: Category[]
	errors?: string
}

export type Color = {
	ID: number
	products: Product[]
	name: string
	value: string
}

export type ColorResponse = {
	color: Color
	errors?: string
}

export type ColorsResponse = {
	colors: Color[]
	errors?: string
}

export type Size = {
	ID: number
	products: Product[]
	name: string
	value: string
}

export type SizeResponse = {
	size: Size
	errors?: string
}

export type SizesResponse = {
	sizes: Size[]
	errors?: string
}

export type Order = {
	ID: number
	user_id: number
	products: Product[]
	is_paid: boolean
	phone: string
	address: string
}

export type OrderResponse = {
	order: Order
}

export type OrdersResponse = {
	orders: Order[]
}

export type Product = {
	ID: number
	category_id: number
	size_id: number
	color_id: number
	images: ImageResponse[]
	order_id: number
	name: string
	price: number
	quantity: number
}

export type ProductCart = {
	ID: number
	images: ImageResponse[]
	price: number
	name: string
	active: boolean
	quantity: number
}

export type ProductResponse = {
	product: Product
	errors?: string
}

export type ProductUpdateRequest = {
	id: string
	category_id: string
	size_id: string
	color_id: string
	images: File[]
	name: string
	price: string
	quantity: number
}

export type ProductRequest = Omit<ProductUpdateRequest, 'id'>

export type ProductsResponse = {
	products: Product[]
	errors?: string
}

export type ProductExtendedResponse = {
	ID: number
	category_id: number
	category_name: string
	size_id: number
	size_name: string
	color_id: number
	color_name: string
	order_id: number
	images: ImageResponse[]
	name: string
	price: number
	quantity: number
}

export type ProductsExtendedResponse = {
	products: {
		ID: number
		category_id: string
		category_name: string
		size_id: string
		size_name: string
		color_id: string
		color_name: string
		order_id: string
		images: ImageResponse[]
		name: string
		price: string
		quantity: number
	}[]
}
