import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSize } from '../../actions/size'
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

interface CreateSizeDrawerProps {
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
}

export const CreateSizeDialog = ({
	isOpen,
	setIsOpen,
}: CreateSizeDrawerProps) => {
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm({
		defaultValues: {
			name: '',
			value: '',
		},
	})
	const onSubmit = async (data: { name: string; value: string }) => {
		try {
			setLoading(true)
			await createSize(data)
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
				Добавить цвет
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>создание размера</DrawerTitle>
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
							placeholder='название размера'
							{...form.register('name')}
						/>
						<Input
							disabled={loading}
							placeholder='значение размера'
							{...form.register('value')}
						/>
						<div className='self-end flex gap-x-2'>
							<Button
								onClick={() => setIsOpen(false)}
								type='submit'
								disabled={loading}
							>
								создать
							</Button>
							<Button
								type='button'
								onClick={() => setIsOpen(false)}
								variant='outline'
							>
								отменить
							</Button>
						</div>
					</form>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
