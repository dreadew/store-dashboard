import { ProductCreateForm } from '@/components/product-create'
import { getCategoriesByStore } from '../../../../../actions/category'
import { getColorsByStore } from '../../../../../actions/color'
import { getSizesByStore } from '../../../../../actions/size'

interface CreateProductPageProps {
	params: {
		storeId: string
	}
}

export default async function CreateProductPage({
	params,
}: CreateProductPageProps) {
	const { categories } = await getCategoriesByStore(Number(params.storeId))
	const { colors } = await getColorsByStore(Number(params.storeId))
	const { sizes } = await getSizesByStore(Number(params.storeId))
	return (
		<main className='p-5 h-[85vh] flex items-center justify-center'>
			<ProductCreateForm
				store_id={Number(params.storeId)}
				categories={categories}
				colors={colors}
				sizes={sizes}
			/>
		</main>
	)
}
