'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { SignInForm } from './sign-in-form'
import { cn } from '@/lib/utils'

interface SignInButtonProps {
	children: React.ReactNode
	className?: string
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

export const SignInButton = ({
	children,
	className,
	mode = 'redirect',
	asChild,
}: SignInButtonProps) => {
	const router = useRouter()

	const onClick = () => {
		router.push('/auth/sign-in')
	}

	if (mode === 'modal') {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className='mt-2 w-auto p-0 border-none'>
					<SignInForm />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<span onClick={onClick} className={cn(
			'cursor-pointer', className
		)}>
			{children}
		</span>
	)
}
