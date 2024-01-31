import 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			user_id: number
			username: string
			email: string
			is_active: boolean
			email_verified: boolean
		}

		backendTokens: {
			accessToken: string
		}
	}
}
