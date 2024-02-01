'use client'

import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

interface SignOutButtonProps {
	children: React.ReactNode
	className?: string
}

export const SignOutButton = ({ children, className }: SignOutButtonProps) => {
	return (
		<span onClick={() => signOut()} className={
			cn('cursor-pointer', className)
		}>
			{children}
		</span>
	)
}
