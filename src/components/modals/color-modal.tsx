'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createColor } from '../../../actions/color'
import { useColorModal } from '../../../hooks/use-color-modal'
import { createColorSchema } from '../../../schemas'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

interface ColorModalProps {
	store_id: number
}

export const ColorModal = ({ store_id }: ColorModalProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const colorModal = useColorModal()
	const session = useSession()
	const router = useRouter()

	const form = useForm<z.infer<typeof createColorSchema>>({
		resolver: zodResolver(createColorSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof createColorSchema>) => {
		try {
			setLoading(true)
			if (session.data?.user.id) {
				await createColor(values, store_id)
				colorModal.onClose()
				router.refresh()
			}
		} catch (err: any) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title='добавить цвет'
			description='создание нового цвета для товаров'
			isOpen={colorModal.isOpen}
			onClose={colorModal.onClose}
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
												<Input
													disabled={loading}
													placeholder='Серый'
													{...field}
												/>
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
													placeholder='#232323'
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
									onClick={colorModal.onClose}
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
