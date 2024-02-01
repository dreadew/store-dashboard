import axios from 'axios'
import NextAuth, { Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const MINUTE = 60
const HOUR = 60 * MINUTE

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/sign-in',
		signOut: '/',
		error: '/',
	},
	session: {
		maxAge: 1 * HOUR,
	},
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
				try {
					const res = await axios.post(
						'http://localhost:3030/login/token',
						credentials
					)

					return {
						id: res.data?.user.user_id,
						username: res.data?.user.username,
						email: res.data?.user.email,
						is_active: res.data?.user.is_active,
						email_verified: res.data?.user.email_verified,
						jwt: res.data?.access_token,
					}
				} catch (err: any) {
					return null
				}
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }: { token: any; user: User }) => {
			if (user) {
				token.jwt = user.jwt
			}
			return token
		},
		session: async ({ session, token }: { session: Session; token: any }) => {
			try {
				const userDB = await axios.post('http://localhost:3030/users/me', {
					token: token.jwt,
				})
				if (userDB) {
					session.user.id = userDB.data.user_id
					session.user.username = userDB.data.username
					session.user.email = userDB.data.email
					session.user.is_active = userDB.data.is_active
					session.user.email_verified = userDB.data.email_verified
					session.user.jwt = token.jwt
					return session
				}
				return session
			} catch (err: any) {
				return session
			}
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
