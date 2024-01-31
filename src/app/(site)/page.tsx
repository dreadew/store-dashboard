'use client'

import { SignInButton } from '@/components/auth/sign-in-button'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session } = useSession()

	console.log(session)

	return (
		<main className='flex h-full flex-col items-center justify-center'>
			<div className='space-y-2'>
				<h1 className='text-grey-900 text-6xl font-semibold'>auth</h1>
				<p className='text-grey-600 text-sm font-regular'>
					a simple authentication service
				</p>
				<div>
					<SignInButton asChild>
						<Button variant='default' size='lg' className='w-full'>
							sign in
						</Button>
					</SignInButton>
				</div>
			</div>
		</main>
	)
}
