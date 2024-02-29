import { DashboardWrapper } from '@/components/store-page'
import { ProductsExtendedResponse } from '@/types/types.dto'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getCategoryById } from '../../../actions/category'
import { getColorById } from '../../../actions/color'
import { getProducts } from '../../../actions/product'
import { getSizeById } from '../../../actions/size'
import { authOptions } from '../../../core/auth-options'

export default async function DashboardPage() {
	const session = await getServerSession(authOptions)

	if (!session || !session.user) {
		return redirect('/auth/sign-in')
	}

	const products = await getProducts()

	if (products.errors) {
		return (
			<section className='p-5 h-full'>
				<h3>Товары не найдены</h3>
			</section>
		)
	}

	const formattedProducts: ProductsExtendedResponse = { products: [] }

	if (products.products?.length > 0) {
		await Promise.all(
			products?.products?.map(async item => {
				const { category } = await getCategoryById(Number(item.category_id))
				const { color } = await getColorById(Number(item.color_id))
				const { size } = await getSizeById(Number(item.size_id))

				formattedProducts.products.push({
					ID: item.ID,
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
					quantity: item.quantity,
				})
			})
		)
	}

	return (
		<section className='p-5 h-full'>
			<DashboardWrapper products={formattedProducts} />
		</section>
	)
}
