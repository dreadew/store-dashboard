'use client'

import { Filters } from '@/components/filters'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import {
	Brand,
	Category,
	Color,
	ProductExtendedResponse,
	Size,
} from '@/types/types.dto'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBrandById, getBrands } from '../../../actions/brand'
import { getCategories, getCategoryById } from '../../../actions/category'
import { getColorById, getColors } from '../../../actions/color'
import {
	getAvailableProducts,
	getProductsWithFilters,
} from '../../../actions/product'
import { getSizeById, getSizes } from '../../../actions/size'

interface filter {
	category_id: number | null
	brand_id: number | null
	size_id: number | null
	color_id: number | null
}

export default function StorePage() {
	const [extProducts, setExtProducts] = useState<ProductExtendedResponse[]>([])
	const [brands, setBrands] = useState<Brand[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [colors, setColors] = useState<Color[]>([])
	const [sizes, setSizes] = useState<Size[]>([])
	const [open, setIsOpen] = useState<boolean>(false)
	const [filt, setFilt] = useState<filter>({
		category_id: null,
		brand_id: null,
		size_id: null,
		color_id: null,
	})

	useEffect(() => {
		async function fetchProducts() {
			if (filt) {
				const products = await getProductsWithFilters(filt)
				if (!products.products) {
					setExtProducts([])
					return
				}
				const extendedProducts = await Promise.all(
					products.products.map(async item => {
						const { category } = await getCategoryById(Number(item.category_id))
						const { color } = await getColorById(Number(item.color_id))
						const { size } = await getSizeById(Number(item.size_id))
						const { brand } = await getBrandById(item.brand_id)
						return {
							...item,
							brand_name: brand.name,
							category_name: category.name,
							color_name: color.name,
							size_name: size.name,
						} as ProductExtendedResponse
					})
				)
				setExtProducts(extendedProducts)
				return
			}
			const products = await getAvailableProducts()
			if (!products.products) {
				return
			}
			const extendedProducts = await Promise.all(
				products.products.map(async item => {
					const { category } = await getCategoryById(Number(item.category_id))
					const { color } = await getColorById(Number(item.color_id))
					const { size } = await getSizeById(Number(item.size_id))
					const { brand } = await getBrandById(item.brand_id)
					return {
						...item,
						brand_name: brand.name,
						category_name: category.name,
						color_name: color.name,
						size_name: size.name,
					} as ProductExtendedResponse
				})
			)
			setExtProducts(extendedProducts)
		}

		async function fetchFilters() {
			setBrands((await getBrands()).brands)
			setCategories((await getCategories()).categories)
			setColors((await getColors()).colors)
			setSizes((await getSizes()).sizes)
		}
		fetchProducts()
		fetchFilters()
	}, [filt])

	return (
		<>
			<Filters
				brands={brands}
				categories={categories}
				colors={colors}
				sizes={sizes}
				filt={filt}
				setFilt={setFilt}
				open={open}
				setOpen={setIsOpen}
			/>
			<section className='flex gap-x-4'>
				<div className='p-5 h-full px-5 flex flex-col gap-5 flex-grow'>
					<div className='flex justify-between'>
						<div className='flex flex-col gap-1'>
							<h2 className='text-4xl font-bold text-gray-900'>
								Каталог товаров
							</h2>
							<p className='text-xs font-regular text-gray-500'>
								Количество товаров: {extProducts.length}
							</p>
						</div>
						<Button variant='outline' onClick={() => setIsOpen(true)}>
							Фильтры
						</Button>
					</div>
					<div
						className={clsx(
							'h-full',
							extProducts.length === 0
								? 'flex'
								: 'grid grid-cols-1 sm:grid-cols-2 gap-10'
						)}
					>
						{extProducts.length > 0 ? (
							extProducts.map((item, idx) => (
								<div className='h-full' key={`product-card-${idx}`}>
									<ProductCard product={item} idx={idx} />
								</div>
							))
						) : (
							<div className='border-[1px] border-gray-200 p-5 rounded-lg w-full h-full flex items-center justify-center flex-col gap-y-1 text-center'>
								<h2 className='text-2xl font-gray-900 font-bold'>
									Товары отсутствуют
								</h2>
								<span className='text-sm leading-6 text-muted-foreground text-center'>
									Вы можете посмотреть товары в других{' '}
									<Link
										className='font-medium text-gray-900 underline'
										href={'/store'}
									>
										магазинах
									</Link>
								</span>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	)
}
