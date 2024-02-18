import { useRouter } from 'next/navigation'
import { deleteProduct } from '../../actions/product'
import { Button } from './ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './ui/drawer'

interface DeleteProductDrawerProps {
	product_id: number
	isOpen: boolean
	setIsOpen: (arg: boolean) => void
}

export const DeleteProductDialog = ({
	product_id,
	isOpen,
	setIsOpen,
}: DeleteProductDrawerProps) => {
	const router = useRouter()
	const handleClick = async () => {
		try {
			await deleteProduct(product_id)
			router.refresh()
		} catch (err: any) {
			console.error(err)
		}
	}
	return (
		<Drawer open={isOpen}>
			<DrawerTrigger onClick={() => setIsOpen(true)}>удалить</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>
						вы уверены, что хотите удалить товар {product_id}?
					</DrawerTitle>
					<DrawerDescription>
						это действие нельзя будет отменить
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className='flex self-end flex-row pt-0'>
					<Button
						onClick={() => {
							handleClick()
							setIsOpen(!isOpen)
						}}
					>
						удалить
					</Button>
					<DrawerClose onClick={() => setIsOpen(false)}>
						<Button type='button' variant='outline'>
							отменить
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
