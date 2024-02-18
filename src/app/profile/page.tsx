import { UserProfile } from '@/components/user-profile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../core/auth-options'

export default async function ProfilePage() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		redirect('/sign-in')
	}
	return (
		<section className='p-5 min-h-[90vh] h-[90vh]'>
			<UserProfile session={session} />
		</section>
	)
}
