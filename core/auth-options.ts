import { Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { setCookie } from 'nookies'
import { signIn } from '../actions/sign-in'
import { getMe } from '../actions/user'

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/sign-in',
		signOut: '/',
		error: '/',
	},
	session: {
		maxAge: 1 * 60 * 60,
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
					const data = await signIn(credentials)

					setCookie(null, '_token', data.user.token, { path: '/' })

					return {
						id: data.user.ID,
						username: data.user.username,
						email: data.user.email,
						is_verified: data.user.is_verified,
						role: data.user.role,
						orders: data.user.orders,
						jwt: data.user.token,
					}
				} catch (err: any) {
					return err
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
				const userDB = await getMe(token.jwt)
				if (userDB) {
					session.user.id = userDB.user.ID
					session.user.username = userDB.user.username
					session.user.email = userDB.user.email
					session.user.is_verified = userDB.user.is_verified
					session.user.orders = userDB.user.orders
					session.user.role = userDB.user.role
					session.user.jwt = token.jwt
					setCookie(null, '_token', token.jwt, { path: '/' })
					return session
				}
				return session
			} catch (err: any) {
				return session
			}
		},
	},
}
