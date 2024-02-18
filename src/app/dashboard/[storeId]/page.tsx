import { DashboardWrapper } from '@/components/store-page'
import { ProductsExtendedResponse } from '@/types/types.dto'
import { getCategoryById } from '../../../../actions/category'
import { getColorById } from '../../../../actions/color'
import { getProductByStoreId } from '../../../../actions/product'
import { getSizeById } from '../../../../actions/size'
import { getStoreById } from '../../../../actions/store'

interface DashboardPageProps {
	params: {
		storeId: string
	}
}

export default async function DashboardStorePage({
	params,
}: DashboardPageProps) {
	const data = await getStoreById(Number(params.storeId))
	const products = await getProductByStoreId(Number(params.storeId))
	const formattedProducts: ProductsExtendedResponse = { products: [] }

	if (products.products?.length > 0) {
		await Promise.all(
			products?.products?.map(async item => {
				const { category } = await getCategoryById(Number(item.category_id))
				const { color } = await getColorById(Number(item.color_id))
				const { size } = await getSizeById(Number(item.size_id))

				formattedProducts.products.push({
					ID: item.ID,
					store_id: String(item.store_id),
					category_id: String(item.category_id),
					size_id: String(item.size_id),
					color_id: String(item.color_id),
					order_id: String(item.order_id),
					images: item.images,
					name: item.name,
					price: String(item.price),
					category_name: category.name,
					size_name: size.name,
					color_name: color.name,
					available: item.available,
				})
			})
		)
	}

	return (
		<div className='p-5 h-full'>
			<DashboardWrapper
				store_id={params.storeId}
				products={formattedProducts}
				data={data}
			/>
			{/*<CategoryModal store_id={Number(params.storeId)} />
			<SizeModal store_id={Number(params.storeId)} />
	<ColorModal store_id={Number(params.storeId)} />*/}
		</div>
	)
}
