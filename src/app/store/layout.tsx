import { MainNavbar } from '@/components/main-navbar'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../core/auth-options'

export default async function StoreLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (!session?.user?.is_verified) {
		//redirect('/auth/sign-in')
	}

	return (
		<main>
			<MainNavbar mode='store' />
			<section className='min-h-[90vh] h-[90vh]'>{children}</section>
		</main>
	)
}
