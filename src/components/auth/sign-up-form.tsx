'use client'

import * as z from 'zod'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../../../actions/sign-up'
import { SignUpSchema } from '../../../schemas'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CardWrapper } from './card-wrapper'

export const SignUpForm = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: '',
			password: '',
			username: '',
		},
	})

	const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			signUp(values).then(data => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel='create an account'
			backButtonLabel='already have an account?'
			backButtonHref='/auth/sign-in'
			showSocial
		>
			<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label
							className={cn(
								errors.username ? 'text-destructive' : 'text-grey-700'
							)}
						>
							username
						</Label>
						<Input
							type='username'
							placeholder='dreadew'
							disabled={isPending}
							{...register('username')}
						/>
						{errors.username && (
							<FormError
								withBackground={false}
								message={errors.username.message}
							/>
						)}
					</div>
					<div className='space-y-2'>
						<Label
							className={cn(
								errors.email ? 'text-destructive' : 'text-grey-700'
							)}
						>
							email
						</Label>
						<Input
							type='email'
							placeholder='john.doe@example.com'
							disabled={isPending}
							{...register('email')}
						/>
						{errors.email && (
							<FormError
								withBackground={false}
								message={errors.email.message}
							/>
						)}
					</div>
					<div className='space-y-2'>
						<Label
							className={cn(
								errors.password ? 'text-destructive' : 'text-grey-700'
							)}
						>
							password
						</Label>
						<Input
							type='password'
							placeholder='*********'
							disabled={isPending}
							{...register('password')}
						/>
						{errors.password && (
							<FormError
								withBackground={false}
								message={errors.password.message}
							/>
						)}
					</div>
				</div>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button type='submit' className='w-full' disabled={isPending}>
					sign up
				</Button>
			</form>
		</CardWrapper>
	)
}
