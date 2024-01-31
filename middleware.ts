import { parseCookies } from 'nookies'
import axios from 'axios'

export function authMiddleware(handler) {
	return async (context) => {
		const cookies = parseCookies(context)

		const accessToken = cookies._token

		if (!accessToken || !isValidToken(accessToken)) {
			context.res.writeHead(302, { Location: '/auth/sign-in' })
			context.res.end
			return {}
		}
	}

	return handler(context)
}

function isValidToken(token: str) {
	const user = await axios.post('http://localhost:3030/login/user', token)
	
	console.log(user)

	if (user.status == 401) {
		return false
	}

	return true
}