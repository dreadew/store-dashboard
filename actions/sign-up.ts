'use server'

import { UserResponse } from '@/types/types.dto'
import axios from 'axios'
import * as z from 'zod'
import { SignUpSchema } from '../schemas'

export const signUp = async (
	values: z.infer<typeof SignUpSchema>
): Promise<UserResponse> => {
	try {
		const { data } = await axios.post(
			'http://localhost:3030/api/auth/register',
			values
		)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
