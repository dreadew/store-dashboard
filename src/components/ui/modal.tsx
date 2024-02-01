'use client'

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from './dialog'

interface ModalProps {
	title: string
	description: string
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
	title,
	description,
	isOpen,
	onClose,
	children
}) => {
	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<div className='fixed h-full w-full top-0 left-0 flex items-center justify-center'>
			<Dialog open={isOpen} onOpenChange={onChange}>
				<DialogContent className='relative min-w-[75%] shadow-xl rounded-lg p-3 border-gray-200 border-[1px]'>
					<DialogHeader className='flex flex-col space-y-1'>
						<DialogTitle className='text-xl font-medium text-gray-900'>{title}</DialogTitle>
						<DialogDescription className='text-xs text-gray-400 font-regular'>{description}</DialogDescription>
					</DialogHeader>
					<div>
						{children}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}