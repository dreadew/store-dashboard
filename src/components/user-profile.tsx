'use client'

import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
import Link from 'next/link'
import { updateOrderStatus } from '../../actions/order'
import { SignOutButton } from './auth/sign-out-button'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { CodeInputForm } from './ui/code-input-form'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table'

export const UserProfile = ({ session }: { session: Session }) => {
	const handleClick = async (
		values: {
			is_paid: boolean
		},
		id: number
	) => {
		try {
			await updateOrderStatus({
				is_paid: values.is_paid,
				id: id,
			})
		} catch (err: any) {
			console.error(err)
		}
	}
	return (
		<section className='h-full flex flex-col lg:flex-row gap-5'>
			<Card className='w-full lg:w-max h-max'>
				<CardHeader>
					<CardTitle className='text-gray-900 font-bold'>
						Привет, {session?.user.username}
					</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col gap-y-5'>
					<div className='flex w-full lg:w-max gap-x-2 items-center'>
						<p className='text-md font-medium text-gray-600'>
							Эл. почта: {session?.user.email}
						</p>
						<span
							className={cn(
								'text-xs p-2 rounded-lg font-medium',
								session.user.is_verified
									? 'bg-emerald-500/15 text-emerald-500'
									: 'bg-destructive/15 text-destructive'
							)}
						>
							{session.user.is_verified ? 'подтверждена' : 'не подтверждена'}
						</span>
					</div>
					{!session.user.is_verified && (
						<CodeInputForm user_id={session?.user.id} />
					)}
				</CardContent>
				<CardFooter className='w-full'>
					<SignOutButton className='w-full'>
						<Button variant='outline' size='lg' className='w-full'>
							выйти из аккаунта
						</Button>
					</SignOutButton>
				</CardFooter>
			</Card>
			<div className='p-5 h-full flex items-start lg:items-center justify-center w-full border-[1px] border-gray-200 rounded-lg'>
				{session.user.orders?.length > 0 ? (
					<div className='w-full flex flex-col gap-y-2'>
						<h2 className='text-gray-900 font-bold text-xl'>Список заказов</h2>
						<Table className='w-full'>
							<TableHeader>
								<TableRow>
									<TableCell>ID магазина</TableCell>
									<TableCell>Количество товаров</TableCell>
									<TableCell>Адрес</TableCell>
									<TableCell>Номер телефона</TableCell>
									<TableCell>Цена</TableCell>
									<TableCell>Статус</TableCell>
									<TableCell>Действия</TableCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{session.user.orders.map((item, idx) => (
									<TableRow key={`order-${idx}`}>
										<TableCell>{item.store_id}</TableCell>
										<TableCell>{item.products.length}</TableCell>
										<TableCell>{item.address}</TableCell>
										<TableCell>{item.phone}</TableCell>
										<TableCell>
											{item.products.reduce((acc, val) => acc + val.price, 0)}₽
										</TableCell>
										<TableCell>
											{item.is_paid ? (
												<span className='p-3 w-max flex rounded-lg text-emerald-500 bg-emerald-500/15'>
													Оплачен
												</span>
											) : (
												<span className='p-3 w-max flex rounded-lg text-red-500 bg-red-500/15'>
													Не оплачен
												</span>
											)}
										</TableCell>
										<TableCell>
											<Button
												onClick={() => handleClick({ is_paid: true }, item.ID)}
												size='lg'
												variant='outline'
												disabled={item.is_paid}
											>
												Оплатить
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				) : (
					<div className='flex items-center justify-center flex-col gap-y-1'>
						<h2 className='text-2xl font-gray-900 font-bold'>
							Заказы отсутствуют
						</h2>
						<span className='text-sm leading-6 text-muted-foreground'>
							Вы можете оформить заказ в{' '}
							<Link
								className='font-medium text-gray-900 underline'
								href={'/cart'}
							>
								корзине
							</Link>
						</span>
					</div>
				)}
			</div>
		</section>
	)
}
