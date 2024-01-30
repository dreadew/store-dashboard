'use server'

import * as z from 'zod'
import { SignUpSchema } from '../schemas'

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'invalid fields' }
	}

	return { success: 'all right' }
}
