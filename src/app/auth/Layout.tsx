import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../core/auth-options'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	if (session && session.user) {
		return redirect('/')
	}

	return <main className='h-full'>{children}</main>
}
