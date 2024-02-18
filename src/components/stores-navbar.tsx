import { useSession } from 'next-auth/react'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { useStoreModal } from '../../hooks/use-store-modal'
import { DeleteStoreDialog } from './delete-store-dialog'
import { StoreSwitcher } from './store-switcher'
import { Button } from './ui/button'
import { ChangeStoreDialog } from './update-store-dialog'

export const StoresNavbar = () => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [changeOpen, setChangeOpen] = useState<boolean>(false)
	const params = useParams()
	const session = useSession()

	const onOpen = useStoreModal(state => state.onOpen)

	return (
		<>
			<nav className='sticky top-0 border-b border-gray-200 px-6 py-2 text-sm bg-white z-10'>
				<div className='flex items-center gap-x-4'>
					{session.data?.user.stores ? (
						<StoreSwitcher data={session.data.user.stores} />
					) : (
						<Button onClick={() => onOpen()}>Создать магазин</Button>
					)}
					<ol className='flex gap-4'>
						{pathname !== '/dashboard' && (
							<>
								<Button
									onClick={() => setIsOpen(!isOpen)}
									size='sm'
									variant='outline'
								>
									удалить
								</Button>
								<Button
									onClick={() => setChangeOpen(!changeOpen)}
									size='sm'
									variant='outline'
								>
									настройки
								</Button>
							</>
						)}
					</ol>
				</div>
			</nav>
			<DeleteStoreDialog
				store_id={Number(params.storeId)}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<ChangeStoreDialog
				store_id={Number(params.storeId)}
				isOpen={changeOpen}
				setIsOpen={setChangeOpen}
			/>
		</>
	)
}
