'use client'

import { AuthForm } from '@/components/auth-form'
import { UserProfile } from '@/components/user-profile'
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session } = useSession()

	return (
		<main className='flex h-full flex-col items-center justify-center'>
			<div className='space-y-2'>
				{session?.user ? <UserProfile session={session} /> : <AuthForm />}
			</div>
		</main>
	)
}
