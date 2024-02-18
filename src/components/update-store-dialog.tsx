'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateStore } from '../../actions/store'
import { Button } from './ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './ui/drawer'
import { Input } from './ui/input'

interface ChangeStoreDrawerProps {
	store_id: number
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
}

export const ChangeStoreDialog = ({
	store_id,
	isOpen,
	setIsOpen,
}: ChangeStoreDrawerProps) => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm({
		defaultValues: {
			name: '',
		},
	})
	const onSubmit = async (data: { name: string }) => {
		try {
			setLoading(true)
			await updateStore({ name: data.name, id: Number(store_id) })
			router.refresh()
		} catch (err: any) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}
	return (
		<Drawer open={isOpen}>
			<DrawerTrigger asChild onClick={() => setIsOpen(true)}>
				настройки
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>редактирование магазина {store_id}</DrawerTitle>
					<DrawerDescription>
						это действие нельзя будет отменить
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className='flex flex-row pt-0'>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-full flex flex-col gap-y-2'
					>
						<Input
							disabled={loading}
							placeholder='название магазина'
							{...form.register('name')}
						/>
						<div className='self-end flex gap-x-2'>
							<Button
								onClick={() => setIsOpen(false)}
								type='submit'
								disabled={loading}
							>
								изменить
							</Button>
							<Button onClick={() => setIsOpen(false)} variant='outline'>
								отменить
							</Button>
						</div>
					</form>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
