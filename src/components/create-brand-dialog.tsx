import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createBrand } from '../../actions/brand'
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

interface CreateBrandDrawerProps {
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
}

export const CreateBrandDialog = ({
	isOpen,
	setIsOpen,
}: CreateBrandDrawerProps) => {
	const router = useRouter()
	const session = useSession()
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm({
		defaultValues: {
			name: '',
		},
	})
	const onSubmit = async (data: { name: string }) => {
		try {
			setLoading(true)
			await createBrand(data)
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
				Добавить бренд
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>создание бренда</DrawerTitle>
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
							placeholder='название бренда'
							{...form.register('name')}
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
