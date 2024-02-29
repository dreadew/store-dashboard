'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createOrder } from '../../../actions/order'
import { useCartStore } from '../../../hooks/use-cart-store'

export default function CartPage() {
	const { storeProducts, updateProductState, removeProductFromCart } =
		useCartStore()
	const session = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState<boolean>(false)
	const form = useForm({
		defaultValues: {
			address: '',
			phone: '',
		},
	})
	const allProducts = Object.entries(storeProducts).flatMap(
		([storeId, products]) => {
			return (products || []).map(product => ({
				...product,
				storeId: parseInt(storeId),
			}))
		}
	)

	const [phoneNumber, setPhoneNumber] = useState('')

	const handlePhoneNumberChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const formattedPhoneNumber = event.target.value.replace(/\D/g, '')
		let maskedPhoneNumber = ''
		if (formattedPhoneNumber.length >= 1) {
			maskedPhoneNumber += '+7 '
		}
		if (formattedPhoneNumber.length >= 2) {
			maskedPhoneNumber += `(${formattedPhoneNumber.slice(1, 4)}`
		}
		if (formattedPhoneNumber.length >= 5) {
			maskedPhoneNumber += `) ${formattedPhoneNumber.slice(4, 7)}`
		}
		if (formattedPhoneNumber.length >= 8) {
			maskedPhoneNumber += `-${formattedPhoneNumber.slice(7, 9)}`
		}
		if (formattedPhoneNumber.length >= 10) {
			maskedPhoneNumber += `-${formattedPhoneNumber.slice(9, 11)}`
		}
		setPhoneNumber(maskedPhoneNumber)
		form.setValue('phone', formattedPhoneNumber)
	}

	const onSubmit = async (values: { phone: string; address: string }) => {
		if (values.phone === '' || values.address === '') {
			return
		}
		setLoading(true)
		try {
			if (session.data?.user.is_verified) {
				Object.entries(storeProducts).forEach(async ([storeId, products]) => {
					const orderedProducts = products.filter(i => i.quantity > 0)
					if (orderedProducts.length > 0) {
						orderedProducts.map(it =>
							removeProductFromCart(Number(storeId), it.ID)
						)
					}
					const activeProducts = (products || []).filter(
						product => product.active
					)
					if (activeProducts.length > 0) {
						await createOrder({
							user_id: session.data.user.id,
							products: activeProducts,
							phone: values.phone,
							address: values.address,
						})
						router.push('/profile')
					}
				})
			}
		} catch (err: any) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className='p-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
			<ul className='flex flex-col gap-y-3'>
				{allProducts.length === 0 && (
					<li className='h-full flex flex-col gap-y-2 items-center justify-center border-[1px] border-gray-200 rounded-lg p-5'>
						<h3 className='text-3xl text-center lg:text-start font-bold text-gray-900'>
							Товары отсутствуют
						</h3>
						<p className='text-sm lg:text-start text-center text-muted-foreground leading-7'>
							для того, чтобы добавить товары в корзину перейдите в{' '}
							<Link
								className='text-gray-900 underline font-medium'
								href='/store'
							>
								магазин
							</Link>
						</p>
					</li>
				)}
				{allProducts?.map((item, idx) => (
					<li key={`cart-item-${item.name}`}>
						<div
							className='p-5 border-[1px] border-gray-200 rounded-lg flex justify-between items-center'
							key={`cart-item-${idx}`}
						>
							<div className='flex items-center gap-x-5'>
								{item.images.length > 0 ? (
									<Image
										width={64}
										height={64}
										alt=''
										src={item.images[0].url}
									/>
								) : (
									<div className='w-[64px] h-[64px] border-gray-200 rounded-lg border-[1px]' />
								)}
								<div className='flex flex-col gap-y-1'>
									<span className='text-xl font-bold text-gray-900'>
										{item.name}
									</span>
									<span className='text-xs font-medium text-gray-600'>
										{item.price} ₽
									</span>
								</div>
							</div>
							<input
								checked={item.active ? true : false}
								onChange={() =>
									updateProductState(item.storeId, item.ID, !item.active)
								}
								type='checkbox'
							/>
						</div>
					</li>
				))}
			</ul>
			<div className='border-[1px] h-max p-5 border-gray-200 rounded-lg'>
				<h3 className='text-xl font-bold text-gray-900'>Детали заказа</h3>
				<ul className='mt-3 flex flex-col gap-y-3'>
					<li className='flex justify-between items-center'>
						<span className='text-sm text-gray-900'>Количество товаров</span>
						<span className='text-sm text-gray-900'>
							{allProducts.filter(i => i.active === true).length}
						</span>
					</li>
					<li className='flex justify-between items-center'>
						<span className='text-sm text-gray-900'>Цена</span>
						<span className='text-sm text-gray-900'>
							{allProducts
								.filter(i => i.active === true)
								.reduce((acc, val) => acc + val.price, 0)}
							₽
						</span>
					</li>
				</ul>
				<form
					className='flex mt-5 flex-col gap-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<Input
						{...form.register('address')}
						disabled={loading}
						placeholder='Адрес'
					/>
					<Input
						{...form.register('phone')}
						disabled={loading}
						placeholder='Номер телефона'
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
					<Button type='submit' className='w-full'>
						Оформить заказ
					</Button>
				</form>
			</div>
		</section>
	)
}
