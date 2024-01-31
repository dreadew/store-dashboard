import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
				},
				password: {
					label: 'password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null
				const res = await axios.post(
					'http://localhost:3030/login/token',
					credentials
				)

				if (res.data?.error) {
					return null
				}

				const user = res.data?.user
				return user
			},
		}),
	],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
