'use server'

import * as z from 'zod'
import axios from 'axios'
import { SignUpSchema } from '../schemas'

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	try {
		await axios.post('http://localhost:3030/users', values)
		return { success: 'your account has been created! we sent you a verification email'}
	} catch (err: any) {
		return { error: err.response.data.detail || 'invalid data' }
	}
}
