'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import * as z from 'zod'
import { SignInSchema } from '../schemas'

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	try {
		const user = await axios.post('http://localhost:3030/login/token', values)
		cookies().set('_token', user.data.access_token)
		console.log(user.data.access_token)
		return {
			success: 'all right',
			user: user,
		}
	} catch (err: any) {
		return { error: err.response.data.detail || 'invalid data' }
	}
}
