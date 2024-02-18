interface BentoGridProps {
	children: React.ReactNode
}

export const BentoGrid = ({ children }: BentoGridProps) => {
	return (
		<section className='flex flex-col lg:grid grid-rows-3 lg:grid-cols-2 gap-4'>
			{children}
		</section>
	)
}
