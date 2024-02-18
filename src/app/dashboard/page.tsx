import { StoresList } from '@/components/stores-list'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getStoresById } from '../../../actions/store'
import { authOptions } from '../../../core/auth-options'

export default async function DashboardPage() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return redirect('/auth/sign-in')
	}
	const { stores } = await getStoresById(session.user.id)

	return (
		<div className='p-5 h-full'>
			<StoresList mode='DASHBOARD' stores={stores} />
		</div>
	)
}
