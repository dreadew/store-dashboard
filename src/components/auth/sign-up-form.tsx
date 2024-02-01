'use client'

import * as z from 'zod'

import { cn } from '@/lib/utils'
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
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Captcha } from '../captcha'

export const SignUpForm = () => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	const [open, setOpen] = useState<boolean>(false)
	const [verified, setVerified] = useState<boolean>(false)

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
		if (!verified) {
			setError('сначала пройдите каптчу')
			return
		}

		setError('')
		setSuccess('')

		startTransition(() => {
			signUp(values).then(callback => {
				setError(callback.error)
				setSuccess(callback.success)
				if (!callback.error) {
					router.push('/auth/sign-in')
				}
			})
		})
		setVerified(false)
	}

	return (
		<CardWrapper
			headerLabel='create an account'
			backButtonLabel='already have an account?'
			backButtonHref='/auth/sign-in'
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
				{
					verified ? (
						<p className='p-3 bg-emerald-500/15 text-emerald-500 rounded-lg flex text-sm justify-between items-center'>каптча пройдена<span>&#10003;</span></p>
					) : (
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger className='h-10 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground'>open captcha</DialogTrigger>
							<DialogContent className='rounded-lg'>
								<Captcha verified={verified} setOpen={setOpen} setVerified={setVerified} />
							</DialogContent>
					</Dialog>
					)
				}
				<FormError message={error} />
				<FormSuccess message={success} />
				<Button type='submit' className='w-full' disabled={isPending || !verified}>
					sign up
				</Button>
			</form>
		</CardWrapper>
	)
}
