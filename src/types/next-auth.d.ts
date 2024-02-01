import 'next-auth'

declare module 'next-auth' {
	interface User {
		email: string
		username: string
		is_active: boolean
		email_verified: boolean
		jwt: string
	}

	interface Session {
		user: {
			id: number
			username: string
			email: string
			is_active: boolean
			email_verified: boolean
			jwt: string
		}
	}
}
