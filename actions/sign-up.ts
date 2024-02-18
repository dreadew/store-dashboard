'use server'

import { ErrorResponse, UserResponse } from '@/types/types.dto'
import axios from 'axios'
import * as z from 'zod'
import { SignUpSchema } from '../schemas'

export const signUp = async (
	values: z.infer<typeof SignUpSchema>
): Promise<UserResponse | ErrorResponse> => {
	const validatedFields = SignUpSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	try {
		const { data } = await axios.post(
			'http://localhost:3030/api/auth/register',
			values
		)
		return data
	} catch (err: any) {
		return { error: err.response.data.detail || 'invalid data' }
	}
}
