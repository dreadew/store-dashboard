'use client'

import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { Dialog } from '../ui/dialog'
import { SignInForm } from './sign-in-form'

interface SignInButtonProps {
	children: React.ReactNode
	mode?: 'modal' | 'redirect'
	asChild?: boolean
}

export const SignInButton = ({
	children,
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
		<span onClick={onClick} className='cursor-pointer'>
			{children}
		</span>
	)
}
