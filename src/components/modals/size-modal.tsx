'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createSize } from '../../../actions/size'
import { useSizeModal } from '../../../hooks/use-size-modal'
import { createSizeSchema } from '../../../schemas'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

interface SizeModalProps {
	store_id: number
}

export const SizeModal = ({ store_id }: SizeModalProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const sizeModal = useSizeModal()
	const session = useSession()
	const router = useRouter()

	const form = useForm<z.infer<typeof createSizeSchema>>({
		resolver: zodResolver(createSizeSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof createSizeSchema>) => {
		try {
			setLoading(true)
			if (session.data?.user.id) {
				await createSize(values, store_id)
				router.refresh()
				sizeModal.onClose()
			}
		} catch (err: any) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title='добавить размер'
			description='создание нового размера для товаров'
			isOpen={sizeModal.isOpen}
			onClose={sizeModal.onClose}
		>
			<div className='pt-2'>
				<div className='space-y-2 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-y-3'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input disabled={loading} placeholder='xl' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='value'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													disabled={loading}
													placeholder='extra large'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='pt-4 space-x-2 flex items-center justify-end'>
								<Button
									disabled={loading}
									variant='outline'
									onClick={sizeModal.onClose}
								>
									Отменить
								</Button>
								<Button disabled={loading} type='submit'>
									Создать
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}
