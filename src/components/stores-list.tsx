import { StoresResponse } from '@/types/types.dto'
import Link from 'next/link'
import { Button } from './ui/button'

interface StoresListProps extends StoresResponse {
	mode: 'DASHBOARD' | 'STORE'
}

export const StoresList = ({ stores, mode }: StoresListProps) => {
	return (
		<section className='h-full flex flex-col gap-y-3'>
			{stores.length > 0 ? (
				stores.map((item, idx) => (
					<div
						className='p-3 border-[1px] border-gray-200 rounded-lg bg-white flex justify-between items-center'
						key={`store-${idx}`}
					>
						<div className='flex flex-col gap-y-1'>
							<h3 className='text-2xl text-gray-900 font-bold'>{item.name}</h3>
							<span className='text-sm text-gray-500'>
								Количество товаров: {item.products.length}
							</span>
						</div>
						<Button variant='outline'>
							<Link
								href={
									mode === 'STORE'
										? `/store/${item.ID}`
										: `/dashboard/${item.ID}`
								}
							>
								Открыть
							</Link>
						</Button>
					</div>
				))
			) : (
				<div className='border-[1px] border-gray-200 p-5 rounded-lg w-full h-full flex items-center justify-center flex-col gap-y-1 text-center'>
					<h2 className='text-2xl font-gray-900 font-bold'>
						Магазины отсутствуют
					</h2>
					<span className='text-sm leading-6 text-muted-foreground text-center'>
						Перейти на{' '}
						<Link className='font-medium text-gray-900 underline' href={'/'}>
							главную страницу
						</Link>
					</span>
				</div>
			)}
		</section>
	)
}
