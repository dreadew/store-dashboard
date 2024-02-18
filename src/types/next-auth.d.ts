import 'next-auth'
import { Order } from './types.dto'

declare module 'next-auth' {
	interface User {
		email: string
		username: string
		is_verified: boolean
		role: string
		stores: Store[]
		orders: Order[]
		jwt: string
	}

	interface Session {
		user: {
			id: number
			username: string
			email: string
			is_verified: boolean
			role: string
			stores: Store[]
			orders: Order[]
			jwt: string
		}
	}
}
