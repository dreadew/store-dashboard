'use client'

import { useRouter } from 'next/navigation'

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
		router.push('/api/auth/sign-in')
	}

	if (mode === 'modal') {
		return <span>TODO: Implement modal</span>
	}

	return (
		<span onClick={onClick} className='cursor-pointer'>
			{children}
		</span>
	)
}
