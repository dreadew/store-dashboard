import { DashboardNavbar } from '@/components/dashboard-navbar'
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
			<DashboardNavbar />
			<section className='min-h-[80vh] h-[85vh]'>{children}</section>
		</main>
	)
}
