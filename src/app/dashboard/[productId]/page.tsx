import { ProductWrapper } from '@/components/product-wrapper'
import { getBrandById, getBrands } from '../../../../actions/brand'
import { getCategories, getCategoryById } from '../../../../actions/category'
import { getColorById, getColors } from '../../../../actions/color'
import { getProductById } from '../../../../actions/product'
import { getSizeById, getSizes } from '../../../../actions/size'

interface DashboardPageProductProps {
	params: {
		productId: string
	}
}

export default async function DashboardStoreProductPage({
	params,
}: DashboardPageProductProps) {
	const { product, errors } = await getProductById(Number(params.productId))
	if (errors) {
		return (
			<section className='min-h-screen'>
				<h3>Товар не найден</h3>
			</section>
		)
	}
	const { category } = await getCategoryById(Number(product.category_id))
	const { color } = await getColorById(Number(product.color_id))
	const { size } = await getSizeById(Number(product.size_id))
	const { brand } = await getBrandById(product.brand_id)
	const { categories } = await getCategories()
	const { colors } = await getColors()
	const { sizes } = await getSizes()
	const { brands } = await getBrands()

	return (
		<section className='p-5'>
			<ProductWrapper
				categories={categories}
				brands={brands}
				colors={colors}
				sizes={sizes}
				product={product}
				color_name={color.name}
				category_name={category.name}
				size_name={size.name}
				brand_name={brand.name}
			/>
		</section>
	)
}
