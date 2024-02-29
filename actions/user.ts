import { UserResponse } from '@/types/types.dto'
import axios from '../core/axios'

export const getMe = async (token: string): Promise<UserResponse> => {
	try {
		const { data } = await axios.post('/api/auth/me', {
			token,
		})
		return data
	} catch (err: any) {
		return err.response.data
	}
}

export const verify = async (
	id: number,
	code: number
): Promise<UserResponse> => {
	try {
		const { data } = await axios.post('/api/auth/verify', {
			id,
			verification_code: code,
		})
		return data
	} catch (err: any) {
		return err.response.data
	}
}
