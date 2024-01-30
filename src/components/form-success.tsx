import { cn } from '@/lib/utils'
import { CheckCircledIcon } from '@radix-ui/react-icons'

interface FormSuccessProps {
	message?: string
	withBackground?: boolean
}

export const FormSuccess = ({
	message,
	withBackground = true,
}: FormSuccessProps) => {
	if (!message) return null

	return (
		<div
			className={cn(
				'flex items-center gap-x-2 text-sm text-emerald-500',
				withBackground && 'bg-emerald-500/15 p-3 rounded-md'
			)}
		>
			<CheckCircledIcon className='h-4 w-4' />
			<p>{message}</p>
		</div>
	)
}
