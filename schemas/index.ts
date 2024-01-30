import * as z from 'zod'

export const SignInSchema = z.object({
	email: z.string().email({
		message: 'email is required',
	}),
	password: z.string().min(6, {
		message: 'password must be at least 6 characters',
	}),
})

export const SignUpSchema = z.object({
	email: z.string().email({
		message: 'email is required',
	}),
	password: z.string().min(6, {
		message: 'password must be at least 6 characters',
	}),
	username: z.string().min(6, {
		message: 'username must be at least 6 characters',
	}),
})
