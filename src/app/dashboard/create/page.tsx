import { ProductCreateForm } from '@/components/product-create'
import { getBrands } from '../../../../actions/brand'
import { getCategories } from '../../../../actions/category'
import { getColors } from '../../../../actions/color'
import { getSizes } from '../../../../actions/size'

export default async function CreateProductPage() {
	const { categories } = await getCategories()
	const { colors } = await getColors()
	const { sizes } = await getSizes()
	const { brands } = await getBrands()
	return (
		<section className='p-5 h-screen flex items-center justify-center'>
			<ProductCreateForm
				categories={categories}
				colors={colors}
				sizes={sizes}
				brands={brands}
			/>
		</section>
	)
}
