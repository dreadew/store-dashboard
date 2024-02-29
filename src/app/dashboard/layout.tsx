import { MainNavbar } from '@/components/main-navbar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../../../core/auth-options'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (!session?.user?.is_verified) {
		redirect('/auth/sign-in')
	}

	if (session.user.role === 'user') {
		redirect('/')
	}

	return (
		<main>
			<MainNavbar mode='dashboard' />
			<section className='min-h-screen h-screen'>{children}</section>
		</main>
	)
}
