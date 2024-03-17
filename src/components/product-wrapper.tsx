'use client'

import {
	BrandsResponse,
	CategoriesResponse,
	ColorsResponse,
	Product,
	SizesResponse,
} from '@/types/types.dto'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useCartStore } from '../../hooks/use-cart-store'
import { ProductUpdateForm } from './product-update'
import { Button } from './ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './ui/carousel'

interface ProductWrapperProps
	extends CategoriesResponse,
		SizesResponse,
		ColorsResponse,
		BrandsResponse {
	product: Product
	category_name: string
	brand_name: string
	size_name: string
	color_name: string
}

export const ProductWrapper = ({
	product,
	category_name,
	brand_name,
	size_name,
	color_name,
	categories,
	colors,
	sizes,
	brands,
}: ProductWrapperProps) => {
	const params = useParams()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const session = useSession()
	const { storeProducts, addProductToCart, removeProductFromCart } =
		useCartStore()

	return (
		<main className='p-2'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col gap-y-1'>
					<h2 className='font-bold text-3xl text-gray-900'>{product.name}</h2>
					<span className='text-sm text-gray-500'>{category_name}</span>
					<span className='text-sm text-gray-500'>{brand_name}</span>
				</div>
				<div className='flex flex-col gap-y-1'>
					<span className='text-sm text-gray-500'>{color_name}</span>
					<span className='text-sm text-gray-500'>Размер: {size_name}</span>
					<span className='text-lg text-gray-900 font-bold'>
						Цена: {product.price}
					</span>
				</div>
			</div>
			<div className='flex flex-col gap-4 justify-between'>
				<Carousel className='w-full self-center relative'>
					<CarouselContent>
						{product.images.map((item, idx) => (
							<CarouselItem key={`carousel-item-${idx}`}>
								<Image alt='' width={1000} height={1000} src={item.url} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className='absolute top-[50%] left-0' />
					<CarouselNext className='absolute top-[50%] right-0' />
				</Carousel>
				<div className='flex gap-8'>
					<div className='flex flex-col w-full gap-y-3 min-w-[400px]'>
						<div className='flex items-center gap-2 w-full'>
							{storeProducts[Number(params.storeId)]?.find(
								item => item.ID === product.ID
							) === undefined ? (
								<Button
									className='w-full'
									onClick={() =>
										addProductToCart(Number(params.storeId), {
											ID: product.ID,
											name: product.name,
											images: product.images,
											price: Number(product.price),
											active: true,
										})
									}
									size='lg'
								>
									Добавить
								</Button>
							) : (
								<Button
									className='w-full'
									onClick={() =>
										removeProductFromCart(Number(params.storeId), product.ID)
									}
									size='lg'
								>
									Удалить
								</Button>
							)}
							{session.data?.user.role === 'admin' && (
								<Button
									variant='outline'
									size='lg'
									className='w-full'
									onClick={() => setIsOpen(!isOpen)}
								>
									Изменить
								</Button>
							)}
						</div>
						{isOpen && (
							<div className='border-[1px] border-gray-200 rounded-lg p-5 h-max'>
								<ProductUpdateForm
									product={product}
									categories={categories}
									colors={colors}
									sizes={sizes}
									brands={brands}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}
