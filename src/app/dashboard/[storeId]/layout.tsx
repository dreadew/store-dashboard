import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface DashboardStoreLayoutProps {
	children: React.ReactNode
	params: {
		storeId: string
	}
}

export default async function DashboardStoreLayout({
	children,
	params
}: DashboardStoreLayoutProps) {
	const session = await getServerSession(authOptions)

	if (!session || !session.user.email_verified) {
		redirect('/auth/sign-in')
	}

	// поиск магазина

	return (
		<>
			{children}
		</>
	)
}