'use client'

import { cn } from '@/lib/utils'
import { ProductExtendedResponse } from '@/types/types.dto'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCartStore } from '../../hooks/use-cart-store'
import { Button } from './ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './ui/carousel'

interface ProductCardProps {
	product: ProductExtendedResponse
	idx: number
}

export const ProductCard = ({ product, idx }: ProductCardProps) => {
	const params = useParams()
	const { storeProducts, addProductToCart, removeProductFromCart } =
		useCartStore()

	const handleAddToCart = () => {
		addProductToCart(Number(params.storeId), {
			ID: product.ID,
			name: product.name,
			images: product.images,
			price: Number(product.price),
			active: true,
			quantity: product.quantity,
		})
	}

	const handleRemoveFromCart = () => {
		removeProductFromCart(Number(params.storeId), product.ID)
	}

	return (
		<div
			className='h-full flex flex-col justify-between bg-white'
			key={`product-${idx}`}
		>
			<div className='mb-3 flex items-center justify-center'>
				{product.images.length > 0 ? (
					<Carousel
						className={cn(
							'w-[250px] h-[250px] max-w-[250px] relative',
							product.images.length === 0 && 'flex items-center justify-center'
						)}
					>
						<CarouselContent>
							{product.images.map((item, idx) => (
								<CarouselItem key={`carousel-item-${idx}`}>
									<Image alt='' width={250} height={250} src={item.url} />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className='absolute top-[50%] left-0' />
						<CarouselNext className='absolute top-[50%] right-0' />
					</Carousel>
				) : (
					<div className='w-[250px] h-[250px] rounded-lg border-gray-200 border-[1px] flex items-center justify-center'>
						<h3 className='text-md font-bold text-gray-900'>Нет изображений</h3>
					</div>
				)}
			</div>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col gap-y-1'>
					<Link href={`/store/${product.ID}`}>
						<h2 className='text-lg text-gray-900 font-bold'>{product.name}</h2>
					</Link>
					<p className='text-sm text-gray-500'>{product.category_name}</p>
					<p className='text-sm text-gray-500'>{product.color_name}</p>
					<p className='text-sm text-gray-500'>{product.size_name}</p>
					<h2 className='text-lg text-gray-900 font-bold'>{product.price}₽</h2>
				</div>
				{storeProducts[Number(params.storeId)]?.find(
					item => item.ID === product.ID
				) === undefined ? (
					<Button onClick={handleAddToCart} size='lg'>
						Добавить
					</Button>
				) : (
					<Button onClick={handleRemoveFromCart} size='lg'>
						Удалить
					</Button>
				)}
			</div>
		</div>
	)
}
