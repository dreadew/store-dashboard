'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createStore } from '../../../actions/store'
import { useStoreModal } from '../../../hooks/use-store-modal'
import { createStoreSchema } from '../../../schemas'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

export const StoreModal = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const storeModal = useStoreModal()
	const session = useSession()

	const form = useForm<z.infer<typeof createStoreSchema>>({
		resolver: zodResolver(createStoreSchema),
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof createStoreSchema>) => {
		try {
			setLoading(true)
			if (session.data?.user.id) {
				const res = await createStore(session.data?.user.id, values)
				console.log(res)
				window.location.assign(`/dashboard/${res.store.ID}`)
			}
		} catch (err: any) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title='create store'
			description='add a new store to manage products and categories'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div className='pt-2'>
				<div className='space-y-2 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												disabled={loading}
												placeholder='e-commerce'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='pt-4 space-x-2 flex items-center justify-end'>
								<Button
									disabled={loading}
									variant='outline'
									onClick={storeModal.onClose}
								>
									Cancel
								</Button>
								<Button disabled={loading} type='submit'>
									Create
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}
