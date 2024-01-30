'use client'

import * as z from 'zod'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from '../../../actions/sign-in'
import { SignInSchema } from '../../../schemas'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CardWrapper } from './card-wrapper'

export const SignInForm = () => {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof SignInSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			signIn(values).then(data => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel='welcome back'
			backButtonLabel="don't have an account?"
			backButtonHref='/auth/sign-up'
			showSocial
		>
			<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-4'>
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
					sign in
				</Button>
			</form>
		</CardWrapper>
	)
}