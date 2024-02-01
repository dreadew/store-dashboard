'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { cn } from '@/lib/utils'
import { SignUpForm } from './sign-up-form'

interface SignUpButtonProps {
	children: React.ReactNode
	className?: string
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

export const SignUpButton = ({
	children,
	className,
	mode = 'redirect',
	asChild,
}: SignUpButtonProps) => {
	const router = useRouter()

	const onClick = () => {
		router.push('/auth/sign-up')
	}

	if (mode === 'modal') {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
				<DialogContent className='mt-2 w-auto p-0 border-none'>
					<SignUpForm />
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
