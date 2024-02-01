import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { DashboardNavbar } from '@/components/dashboard-navbar'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (!session?.user.email_verified || !session) {
		redirect('/auth/sign-in')
	}

	/*
	получить список всех магазинов и редирекнуть если есть магазин
	*/

	return (
		<>
			<DashboardNavbar />
			<section className='min-h-[200vh]'>
				{children}
			</section>
		</>
	)
}
