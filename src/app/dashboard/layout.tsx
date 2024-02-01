import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (!session?.user.email_verified || !session) {
		redirect('/auth/sign-in')
	}

	return <section>{children}</section>
}
