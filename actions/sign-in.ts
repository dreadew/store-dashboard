'use server'

import * as z from 'zod'
import axios from 'axios'
import { SignInSchema } from '../schemas'
import { cookies } from 'next/headers'

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	try {
		const token = await axios.post('http://localhost:3030/login/token', values)
		cookies().set('_token', token.data.access_token)
		console.log(token.data.access_token)
	} catch (err: any) {
		return { error: err.response.data.detail || 'invalid data' }
	}

	return { success: 'all right' }
}
