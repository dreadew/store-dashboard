'use client'

import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const { handleSubmit, register } = useForm<z.infer<typeof SignUpSchema>>({
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

		startTransition(async () => {
			await signUp(values).then(callback => {
				if (callback.errors) {
					setError(callback.errors)
				} else {
					setSuccess('вы успешно зарегистрировались')
				}
			})
			router.push('/auth/sign-in')
		})
	}

	return (
		<CardWrapper
			headerLabel='создать аккаунт'
			backButtonLabel='у вас уже есть аккаунт?'
			backButtonHref='/auth/sign-in'
		>
			<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label className='text-grey-700'>никнейм</Label>
						<Input
							type='username'
							placeholder='dreadew'
							disabled={isPending}
							{...register('username')}
						/>
					</div>
					<div className='space-y-2'>
						<Label className='text-grey-700'>эл. почта</Label>
						<Input
							type='email'
							placeholder='john.doe@example.com'
							disabled={isPending}
							{...register('email')}
						/>
					</div>
					<div className='space-y-2'>
						<Label className='text-grey-700'>пароль</Label>
						<Input
							type='password'
							placeholder='*********'
							disabled={isPending}
							{...register('password')}
						/>
					</div>
				</div>
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button type='submit' className='w-full'>
					зарегистрироваться
				</Button>
			</form>
		</CardWrapper>
	)
}
