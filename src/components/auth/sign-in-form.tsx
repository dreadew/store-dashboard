'use client'

import * as z from 'zod'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { SignInSchema } from '../../../schemas'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CardWrapper } from './card-wrapper'
import { Captcha } from '../captcha'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogContent } from '../ui/dialog'

export const SignInForm = () => {
	const [isPending, startTransition] = useTransition()
	const [open, setOpen] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>()
	const [verified, setVerified] = useState<boolean>(false)
	const [success, setSuccess] = useState<string | undefined>()
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/')
		}
	}, [session?.status, router])

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
		if (!verified) {
			setError('сначала пройдите каптчу')
			return
		}
		
		setError('')
		setSuccess('')

		startTransition(() => {
			signIn('credentials', {
				...values,
				redirect: false,
			}).then(callback => {
				if (callback?.error) {
					setError('неправильный логин или пароль')
				}

				if (callback?.ok && !callback?.error) {
					setSuccess('вы успешно авторизовались')
					router.push('/')
				}
			})
		})
		setVerified(false)
	}

	return (
		<CardWrapper
			headerLabel='welcome back'
			backButtonLabel="don't have an account?"
			backButtonHref='/auth/sign-up'
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
				<Button type='submit' className='w-full' disabled={isPending || !verified}>
					sign in
				</Button>
			</form>
		</CardWrapper>
	)
}
