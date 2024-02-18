'use client'
import { Button } from '@/components/ui/button'
import {
	CategoriesResponse,
	ColorsResponse,
	ProductRequest,
	SizesResponse,
} from '@/types/types.dto'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createProduct } from '../../actions/product'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface ProductCreateForm
	extends CategoriesResponse,
		SizesResponse,
		ColorsResponse {
	store_id: number
}

export const ProductCreateForm = ({
	store_id,
	sizes,
	categories,
	colors,
}: ProductCreateForm) => {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [categoryName, setCategoryName] = useState<string>('')
	const [colorName, setColorName] = useState<string>('')
	const [sizeName, setSizeName] = useState<string>('')
	const session = useSession()
	const router = useRouter()
	const form = useForm<ProductRequest>({
		defaultValues: {
			name: '',
			price: '',
			images: [],
			store_id: String(store_id),
			category_id: '',
			size_id: '',
			color_id: '',
		},
	})

	const onSubmit = async (values: ProductRequest) => {
		const formData = new FormData()
		const files = document.getElementById('fileInput') as HTMLInputElement

		formData.append('name', values.name)
		formData.append('price', values.price)
		formData.append('store_id', String(store_id))
		formData.append('category_id', values.category_id)
		formData.append('size_id', values.size_id)
		formData.append('color_id', values.color_id)

		if (files && files.files) {
			for (let i = 0; i < files.files.length; i++) {
				formData.append(`images_${i}`, files.files.item(i) as File)
			}
		}

		try {
			setLoading(true)
			if (session.data?.user.id) {
				await createProduct(formData)
				router.refresh()
				router.push(`/dashboard/${store_id}`)
			}
		} catch (err: any) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card className='max-w-[550px]'>
			<CardHeader className='flex flex-col gap-y-1'>
				<CardTitle className='text-xl font-bold text-gray-900'>
					Создать товар
				</CardTitle>
				<CardDescription className='text-sm text-muted-foreground'>
					Форма создания товара
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<div className='flex flex-col gap-y-2'>
						<Label className='text-sm text-gray-900'>название</Label>
						<Input
							disabled={loading}
							placeholder='Название товара'
							{...form.register('name')}
						/>
					</div>
					<div className='flex flex-col gap-y-2'>
						<Label className='text-sm text-gray-900'>цена</Label>
						<Input
							disabled={loading}
							placeholder='Цена товара'
							{...form.register('price')}
						/>
					</div>
					<select
						id='category_id'
						{...form.register('category_id')}
						value={
							categories.find(item => String(item.ID) === categoryName)?.ID
						}
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
						<Button
							onClick={() => router.push(`/dashboard/${store_id}`)}
							disabled={loading}
							variant='outline'
							type='button'
						>
							Назад
						</Button>
						<Button disabled={loading} type='submit'>
							Создать
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
