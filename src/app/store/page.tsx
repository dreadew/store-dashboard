'use client'

import { ProductCard } from '@/components/product-card'
import { Brand, ProductExtendedResponse } from '@/types/types.dto'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBrandById, getBrands } from '../../../actions/brand'
import { getCategoryById } from '../../../actions/category'
import { getColorById } from '../../../actions/color'
import {
	getAvailableProducts,
	getProductsByBrandId,
} from '../../../actions/product'
import { getSizeById } from '../../../actions/size'

export default function StorePage() {
	const [extProducts, setExtProducts] = useState<ProductExtendedResponse[]>([])
	const [brands, setBrands] = useState<Brand[]>([])
	const [filt, setFilt] = useState<number>(-1)

	useEffect(() => {
		async function fetchProducts() {
			if (filt != -1) {
				const products = await getProductsByBrandId(filt)
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

		async function fetchBrands() {
			const res = await getBrands()
			setBrands(res.brands)
		}
		fetchProducts()
		fetchBrands()
	}, [filt])

	return (
		<div className='p-5 h-full px-5 flex flex-col gap-5'>
			<div className='flex flex-col gap-1'>
				<h2 className='text-4xl font-bold text-gray-900'>Каталог товаров</h2>
				<p className='text-xs font-regular text-gray-500'>
					Количество товаров: {extProducts.length}
				</p>
			</div>
			<select
				className='outline-none border-[1px] w-max border-gray-200 text-gray-900 p-2 rounded-lg transition-colors hover:bg-gray-100'
				value={brands.find(item => item.ID === filt)?.ID}
				onChange={e => setFilt(Number(e.target.value))}
			>
				<option value=''>выберите бренд</option>
				{brands.map((item, idx) => (
					<option key={`category-${idx}`} value={item.ID}>
						{item.name}
					</option>
				))}
			</select>
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
	)
}
