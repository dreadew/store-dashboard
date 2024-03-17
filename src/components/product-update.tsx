'use client'
import { Button } from '@/components/ui/button'
import {
	BrandsResponse,
	CategoriesResponse,
	ColorsResponse,
	Product,
	ProductUpdateRequest,
	SizesResponse,
} from '@/types/types.dto'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateProduct } from '../../actions/product'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface ProductUpdateForm
	extends CategoriesResponse,
		SizesResponse,
		ColorsResponse,
		BrandsResponse {
	product: Product
}

export const ProductUpdateForm = ({
	product,
	sizes,
	categories,
	colors,
	brands,
}: ProductUpdateForm) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [categoryName, setCategoryName] = useState<string>('')
	const [colorName, setColorName] = useState<string>('')
	const [sizeName, setSizeName] = useState<string>('')
	const [brandName, setBrandName] = useState<string>('')
	const session = useSession()
	const router = useRouter()
	const form = useForm<ProductUpdateRequest>({
		defaultValues: {
			id: String(product.ID),
			name: '',
			price: '',
			images: [],
			category_id: '',
			brand_id: '',
			size_id: '',
			color_id: '',
		},
	})

	const onSubmit = async (values: ProductUpdateRequest) => {
		const formData = new FormData()
		const files = document.getElementById('fileInput') as HTMLInputElement

		formData.append('id', String(product.ID))
		formData.append('name', values.name || product.name)
		formData.append('price', values.price || String(product.price))
		formData.append('brand_id', values.brand_id || String(product.brand_id))
		formData.append(
			'category_id',
			values.category_id || String(product.category_id)
		)
		formData.append('size_id', values.size_id || String(product.size_id))
		formData.append('color_id', values.color_id || String(product.color_id))

		if (files && files.files) {
			for (let i = 0; i < files.files.length; i++) {
				formData.append(`images_${i}`, files.files.item(i) as File)
			}
		}

		try {
			setLoading(true)
			if (session.data?.user.id) {
				await updateProduct(formData)
				router.push(`/dashboard`)
			}
		} catch (err: any) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
			<div className='flex flex-col gap-y-2'>
				<Label className='text-sm text-gray-900'>название</Label>
				<Input
					disabled={loading}
					placeholder={product.name}
					{...form.register('name')}
				/>
			</div>
			<div className='flex flex-col gap-y-2'>
				<Label className='text-sm text-gray-900'>цена</Label>
				<Input
					disabled={loading}
					placeholder={String(product.price)}
					{...form.register('price')}
				/>
			</div>
			<select
				id='category_id'
				{...form.register('category_id')}
				value={categories.find(item => String(item.ID) === categoryName)?.ID}
				onChange={e => setCategoryName(e.target.value)}
				className='border-[1px] w-full text-sm text-muted-foreground rounded-lg border-gray-200 p-3'
			>
				<option value=''>выберите категорию</option>
				{categories.map((item, idx) => (
					<option key={`category-${idx}`} value={item.ID}>
						{item.name}
					</option>
				))}
			</select>
			<select
				id='brand_id'
				{...form.register('brand_id')}
				value={brands.find(item => String(item.ID) === brandName)?.ID}
				onChange={e => setBrandName(e.target.value)}
				className='border-[1px] w-full text-sm text-muted-foreground rounded-lg border-gray-200 p-3'
			>
				<option value=''>выберите категорию</option>
				{brands.map((item, idx) => (
					<option key={`brand-${idx}`} value={item.ID}>
						{item.name}
					</option>
				))}
			</select>
			<select
				id='color_id'
				{...form.register('color_id')}
				value={colors.find(item => String(item.ID) === colorName)?.ID}
				onChange={e => setColorName(e.target.value)}
				className='border-[1px] w-full text-sm text-muted-foreground rounded-lg border-gray-200 p-3'
			>
				<option value=''>выберите цвет</option>
				{colors.map((item, idx) => (
					<option key={`color-${idx}`} value={item.ID}>
						{item.name}
					</option>
				))}
			</select>
			<select
				id='size_id'
				{...form.register('size_id')}
				value={sizes.find(item => String(item.ID) === sizeName)?.ID}
				onChange={e => setSizeName(e.target.value)}
				className='border-[1px] w-full text-sm text-muted-foreground rounded-lg border-gray-200 p-3'
			>
				<option value=''>выберите размер</option>
				{sizes.map((item, idx) => (
					<option key={`size-${idx}`} value={item.ID}>
						{item.name}
					</option>
				))}
			</select>
			<div className='flex flex-col gap-y-2'>
				<Label className='text-sm text-gray-900'>изображения</Label>
				<Input
					className='text-muted-foreground'
					disabled={loading}
					multiple
					placeholder='Balenciaga zip-hoodie'
					{...form.register('images')}
					type='file'
					id='fileInput'
				/>
			</div>
			<div className='space-x-2 flex items-center justify-end'>
				<Button variant='outline' disabled={loading} type='submit'>
					Обновить
				</Button>
			</div>
		</form>
	)
}
