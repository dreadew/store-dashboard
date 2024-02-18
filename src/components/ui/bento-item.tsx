import clsx from 'clsx'

interface BentoItemProps {
	className?: string
	title: string
	data: string
	units: string
}

export const BentoItem = ({
	className,
	title,
	data,
	units,
}: BentoItemProps) => {
	return (
		<div
			className={clsx('p-3 border-[1px] border-gray-200 rounded-lg', className)}
		>
			<h3 className='text-md text-gray-600'>{title}</h3>
			<span className='text-2xl text-gray-900 font-bold'>
				{data} {units}
			</span>
		</div>
	)
}
