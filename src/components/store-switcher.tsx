'use client'

import { cn } from '@/lib/utils'
import { Store } from '@/types/types.dto'
import { ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreateStoreDialog } from './create-store-dialog'
import { Button } from './ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
	data: Store[]
}

export const StoreSwitcher = ({ className, data }: StoreSwitcherProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [createOpen, setCreateOpen] = useState<boolean>(false)
	const params = useParams()
	const router = useRouter()

	const formattedItems = data.map(item => ({
		ID: item.ID,
		label: item.name,
		value: item.name,
	}))

	const currentStore = formattedItems?.find(
		item => item.ID === Number(params.storeId)
	)

	const onStoreSelect = (store: {
		ID: number
		value: string
		label: string
	}) => {
		setOpen(false)
		router.push(`/dashboard/${store.ID}`)
	}

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						size='sm'
						role='combobox'
						aria-expanded={open}
						aria-label='select a store'
						className={cn('w-[250px] justify-between', className)}
					>
						<StoreIcon className='mr-2 h-4 w-4' />
						{currentStore?.value || 'выберите магазин'}
						<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandList>
							<CommandInput placeholder='поиск магазина' />
							<CommandEmpty>магазины не найдены.</CommandEmpty>
							<CommandGroup heading='магазины'>
								{formattedItems?.map(store => (
									<CommandItem
										key={store.value}
										onSelect={() => onStoreSelect(store)}
										className='text-sm flex justify-between text-muted-foreground'
									>
										<div className='flex'>
											<StoreIcon className='mr-2 h-4 w-4' />
											{store.label}
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<CommandItem
									onSelect={() => {
										setOpen(false)
										setCreateOpen(!createOpen)
									}}
								>
									<PlusCircle className='mr-2 h-5 w-5' />
									создать магазин
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<CreateStoreDialog isOpen={createOpen} setIsOpen={setCreateOpen} />
		</>
	)
}
