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
	stores: Store[]
}

export type UserResponse = {
	user: User
}

export type ImageResponse = {
	ID: number
	product_id: number
	url: string
}

export type Category = {
	ID: number
	store_id: number
	products: Product[]
	name: string
}

export type CategoryResponse = {
	category: Category
}

export type CategoriesResponse = {
	categories: Category[]
}

export type Color = {
	ID: number
	store_id: number
	products: Product[]
	name: string
	value: string
}

export type ColorResponse = {
	color: Color
}

export type ColorsResponse = {
	colors: Color[]
}

export type Size = {
	ID: number
	store_id: number
	products: Product[]
	name: string
	value: string
}

export type SizeResponse = {
	size: Size
}

export type SizesResponse = {
	sizes: Size[]
}

export type Store = {
	ID: number
	user_id: number
	products: Product[]
	name: string
}

export type StoreResponse = {
	store: Store
}

export type StoresResponse = {
	stores: Store[]
}

export type Order = {
	ID: number
	store_id: number
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
	store_id: number
	category_id: number
	size_id: number
	color_id: number
	images: ImageResponse[]
	order_id: number
	name: string
	price: number
	available: boolean
}

export type ProductCart = {
	ID: number
	images: ImageResponse[]
	price: number
	name: string
	active: boolean
	available: boolean
}

export type ProductResponse = {
	product: Product
}

export type ProductUpdateRequest = {
	id: string
	store_id: string
	category_id: string
	size_id: string
	color_id: string
	images: File[]
	name: string
	price: string
}

export type ProductRequest = Omit<ProductUpdateRequest, 'id'>

export type ProductsResponse = {
	products: Product[]
}

export type ProductExtendedResponse = {
	ID: number
	store_id: number
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
	available: boolean
}

export type ProductsExtendedResponse = {
	products: {
		ID: number
		store_id: string
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
		available: boolean
	}[]
}
