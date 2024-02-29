import { ProductCard } from '@/components/product-card'
import { ProductExtendedResponse } from '@/types/types.dto'
import Link from 'next/link'
import { getCategoryById } from '../../../actions/category'
import { getColorById } from '../../../actions/color'
import { getAvailableProducts } from '../../../actions/product'
import { getSizeById } from '../../../actions/size'

export default async function StorePage() {
	const products = await getAvailableProducts()

	if (products.errors) {
		return (
			<div className='p-5 h-full px-5 flex flex-col gap-5'>
				Товары отсутствуют
			</div>
		)
	}

	const extendedProducts = await Promise.all(
		products.products.map(async item => {
			const category = await getCategoryById(Number(item.category_id))
			const color = await getColorById(Number(item.color_id))
			const size = await getSizeById(Number(item.size_id))
			return {
				...item,
				category_name: category.category.name,
				color_name: color.color.name,
				size_name: size.size.name,
			} as ProductExtendedResponse
		})
	)

	return (
		<div className='p-5 h-full px-5 flex flex-col gap-5'>
			<div className='flex flex-col gap-1'>
				<h2 className='text-4xl font-bold text-gray-900'>Каталог товаров</h2>
				<p className='text-xs font-regular text-gray-500'>
					Количество товаров: {products.products.length}
				</p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-10 h-full'>
				{extendedProducts.length > 0 ? (
					extendedProducts.map((item, idx) => (
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
