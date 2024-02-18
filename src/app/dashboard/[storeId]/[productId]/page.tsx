import { ProductWrapper } from '@/components/product-wrapper'
import {
	getCategoriesByStore,
	getCategoryById,
} from '../../../../../actions/category'
import { getColorById, getColorsByStore } from '../../../../../actions/color'
import { getProductById } from '../../../../../actions/product'
import { getSizeById, getSizesByStore } from '../../../../../actions/size'

interface DashboardPageProductProps {
	params: {
		storeId: string
		productId: string
	}
}

export default async function DashboardStoreProductPage({
	params,
}: DashboardPageProductProps) {
	const { product } = await getProductById(Number(params.productId))
	const { category } = await getCategoryById(Number(product.category_id))
	const { color } = await getColorById(Number(product.color_id))
	const { size } = await getSizeById(Number(product.size_id))
	const { categories } = await getCategoriesByStore(Number(params.storeId))
	const { colors } = await getColorsByStore(Number(params.storeId))
	const { sizes } = await getSizesByStore(Number(params.storeId))

	return (
		<section className='p-5'>
			<ProductWrapper
				store_id={params.storeId}
				categories={categories}
				colors={colors}
				sizes={sizes}
				product={product}
				color_name={color.name}
				category_name={category.name}
				size_name={size.name}
			/>
		</section>
	)
}
