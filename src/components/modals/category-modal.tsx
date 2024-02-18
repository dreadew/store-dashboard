'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createCategory } from '../../../actions/category'
import { useCategoryModal } from '../../../hooks/use-category-modal'
import { createCategorySchema } from '../../../schemas'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

interface CategoryModalProps {
	store_id: number
}

export const CategoryModal = ({ store_id }: CategoryModalProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const categoryModal = useCategoryModal()
	const session = useSession()
	const router = useRouter()

	const form = useForm<z.infer<typeof createCategorySchema>>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {
		try {
			setLoading(true)
			if (session.data?.user.id) {
				await createCategory(values, store_id)
				categoryModal.onClose()
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
			title='добавить категорию'
			description='создание новой категории товаров'
			isOpen={categoryModal.isOpen}
			onClose={categoryModal.onClose}
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
													placeholder='новая коллекция весна/зима 2024'
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
									onClick={categoryModal.onClose}
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
