'use client'

import { useParams, useRouter } from 'next/navigation'
import { useStoreModal } from '../../hooks/use-store-modal'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: {
		id: string
		name: string
	}[]
}

export const StoreSwitcher = ({
	className,
	items
}: StoreSwitcherProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const storeModal = useStoreModal()
	const params = useParams()
	const router = useRouter()

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id
	}))

	const currentStore = formattedItems.find((item) => item.value === params.storeId)

	const onStoreSelect = (store: {value: string, label: string}) => {
		setOpen(false)
		router.push(`/dashboard/${store.value}`)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' size='sm' role='combobox' aria-expanded={open} aria-label='select a store' className={cn('w-[200px] justify-between', className)}>
					<StoreIcon className='mr-2 h-4 w-4' />
					current store
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='search a store' />
						<CommandEmpty>no store found.</CommandEmpty>
						<CommandGroup heading='stores'>
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className='text-sm flex justify-between text-muted-foreground'>
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
									storeModal.onOpen()
								}}
							>
								<PlusCircle className='mr-2 h-5 w-5' />
								create store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}