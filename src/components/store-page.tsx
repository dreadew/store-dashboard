'use client'

import { ProductsExtendedResponse } from '@/types/types.dto'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreateCategoryDialog } from './create-category-dialog'
import { CreateColorDialog } from './create-color-dialog'
import { CreateSizeDialog } from './create-size-dialog'
import { DeleteProductDialog } from './delete-product-dialog'
import { BentoGrid } from './ui/bento-grid'
import { BentoItem } from './ui/bento-item'
import { Button } from './ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

interface DashboardWrapperProps {
	products: ProductsExtendedResponse
}

export const DashboardWrapper = ({ products }: DashboardWrapperProps) => {
	const [categoryOpen, setCategoryOpen] = useState<boolean>(false)
	const [colorOpen, setColorOpen] = useState<boolean>(false)
	const [sizeOpen, setSizeOpen] = useState<boolean>(false)
	const router = useRouter()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<>
			<div className='h-full flex flex-col gap-y-5'>
				<div className='h-full flex flex-col gap-y-2'>
					<h3 className='text-grey-900 font-bold text-xl'>Список товаров</h3>
					{products.products.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Название</TableHead>
									<TableHead>Цена</TableHead>
									<TableHead>Категория</TableHead>
									<TableHead>Размер</TableHead>
									<TableHead>Цвет</TableHead>
									<TableHead>В наличии</TableHead>
									<TableHead></TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.products.map((item, idx) => (
									<TableRow key={`product-${idx}`}>
										<TableCell>{item.ID}</TableCell>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.price}</TableCell>
										<TableCell>{item.category_name}</TableCell>
										<TableCell>{item.size_name}</TableCell>
										<TableCell>{item.color_name}</TableCell>
										<TableCell>{item.quantity} шт.</TableCell>
										<TableCell>
											<Button
												onClick={() => router.push(`/dashboard/${item.ID}`)}
												size='sm'
											>
												изменить
											</Button>
										</TableCell>
										<TableCell>
											<DeleteProductDialog
												isOpen={isOpen}
												setIsOpen={setIsOpen}
												product_id={item.ID}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className='h-full w-full flex items-center justify-center border-gray-200 border-[1px] rounded-lg'>
							<h2 className='text-md text-gray-900 font-bold'>
								Товары отсутствуют
							</h2>
						</div>
					)}
				</div>
				<BentoGrid>
					<BentoItem
						title='Количество товаров:'
						data={String(products.products.length)}
						units='шт'
					/>
					<Button
						onClick={() => setCategoryOpen(!categoryOpen)}
						variant='outline'
						className='h-full p-5 lg:p-3'
					>
						Добавить категорию
					</Button>
					<Button
						onClick={() => setColorOpen(!colorOpen)}
						variant='outline'
						className='h-full p-5 lg:p-3'
					>
						Добавить цвет
					</Button>
					<Button
						onClick={() => setSizeOpen(!sizeOpen)}
						variant='outline'
						className='h-full p-5 lg:p-3'
					>
						Добавить размер
					</Button>
					<Button
						onClick={() => router.push(`/dashboard/create`)}
						className='h-full col-start-1 col-end-3 p-5 lg:p-3'
					>
						Добавить товар
					</Button>
				</BentoGrid>
			</div>
			<CreateColorDialog isOpen={colorOpen} setIsOpen={setColorOpen} />
			<CreateCategoryDialog isOpen={categoryOpen} setIsOpen={setCategoryOpen} />
			<CreateSizeDialog isOpen={sizeOpen} setIsOpen={setSizeOpen} />
		</>
	)
}
