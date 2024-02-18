import { StoreModal } from '@/components/modals/store-modal'
import { StoresList } from '@/components/stores-list'
import { getAllStores } from '../../../actions/store'

export default async function StorePage() {
	const { stores } = await getAllStores()
	return (
		<div className='p-5 h-full flex flex-col gap-y-5'>
			<h2 className='font-gray-900 font-bold text-xl'>Список магазинов</h2>
			<StoresList mode='STORE' stores={stores} />
			<StoreModal />
		</div>
	)
}
