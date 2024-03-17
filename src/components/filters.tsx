'use client'

import { cn } from '@/lib/utils'
import { Brand, Category, Color, Size } from '@/types/types.dto'
import { Dispatch, SetStateAction } from 'react'

interface filtersProps {
	brands: Brand[]
	categories: Category[]
	sizes: Size[]
	colors: Color[]
	filt: {
		category_id: number | null
		brand_id: number | null
		size_id: number | null
		color_id: number | null
	}
	setFilt: Dispatch<
		SetStateAction<{
			category_id: number | null
			brand_id: number | null
			size_id: number | null
			color_id: number | null
		}>
	>
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export const Filters = ({
	brands,
	categories,
	colors,
	sizes,
	filt,
	setFilt,
	open,
	setOpen,
}: filtersProps) => {
	return (
		<aside
			className={cn(
				'fixed right-0 top-0 h-screen translate-x-[100%] opacity-0 pointer-events-none z-20 bg-gray-900 transition-all duration-300',
				open && 'opacity-100 translate-x-0 pointer-events-auto'
			)}
		>
			<div className='px-8 py-24 flex flex-col gap-y-4'>
				<button
					onClick={() => setOpen(false)}
					className='absolute top-8 right-8 text-white font-bold'
				>
					&#x2715;
				</button>
				<h3 className='font-bold text-xl text-white'>Фильтрация</h3>
				<div className='flex flex-col gap-y-2'>
					<select
						className='outline-none border-[1px] border-gray-200 text-gray-900 p-2 rounded-lg transition-colors hover:bg-gray-100'
						value={brands?.find(item => item.ID === filt.brand_id)?.ID}
						onChange={e =>
							setFilt({ ...filt, brand_id: Number(e.target.value) })
						}
					>
						<option value=''>выберите бренд</option>
						{brands?.map((item, idx) => (
							<option key={`brand-${idx}`} value={item.ID}>
								{item.name}
							</option>
						))}
					</select>

					<select
						className='outline-none border-[1px] border-gray-200 text-gray-900 p-2 rounded-lg transition-colors hover:bg-gray-100'
						value={categories?.find(item => item.ID === filt.category_id)?.ID}
						onChange={e =>
							setFilt({ ...filt, category_id: Number(e.target.value) })
						}
					>
						<option value=''>выберите категорию</option>
						{categories?.map((item, idx) => (
							<option key={`category-${idx}`} value={item.ID}>
								{item.name}
							</option>
						))}
					</select>

					<select
						className='outline-none border-[1px] border-gray-200 text-gray-900 p-2 rounded-lg transition-colors hover:bg-gray-100'
						value={colors?.find(item => item.ID === filt.color_id)?.ID}
						onChange={e =>
							setFilt({ ...filt, color_id: Number(e.target.value) })
						}
					>
						<option value=''>выберите цвет</option>
						{colors?.map((item, idx) => (
							<option key={`color-${idx}`} value={item.ID}>
								{item.name}
							</option>
						))}
					</select>

					<select
						className='outline-none border-[1px] border-gray-200 text-gray-900 p-2 rounded-lg transition-colors hover:bg-gray-100'
						value={sizes?.find(item => item.ID === filt.size_id)?.ID}
						onChange={e =>
							setFilt({ ...filt, size_id: Number(e.target.value) })
						}
					>
						<option value=''>выберите размер</option>
						{sizes?.map((item, idx) => (
							<option key={`size-${idx}`} value={item.ID}>
								{item.name}
							</option>
						))}
					</select>
				</div>
			</div>
		</aside>
	)
}
