import { UserResponse } from '@/types/types.dto'
import { z } from 'zod'
import axios from '../core/axios'
import { SignInSchema } from '../schemas'

export const signIn = async (
	values: z.infer<typeof SignInSchema>
): Promise<UserResponse> => {
	try {
		const { data } = await axios.post('/api/auth/login', values)
		return data
	} catch (err: any) {
		return err.response.data
	}
}
