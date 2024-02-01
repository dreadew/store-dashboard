import { useParams, usePathname } from 'next/navigation'
import { StoreSwitcher } from './store-switcher'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface StoresNavbarProps {
	navX?: number
}

export const StoresNavbar = ({navX}: StoresNavbarProps) => {
	const pathname = usePathname()
	const params = useParams()

	const routes = [
		{
			href: `/${params.storeId}/settings`,
			label: 'settings',
			active: pathname === `/${params.storeId}/settings`
		}
	]

	const items = [
		{
			id: '123',
			name: '123'
		},
		{
			id: '321',
			name: '321'
		},
		{
			id: '231',
			name: '231'
		}
	]

	return (
		<>
			<nav className='sticky top-0 border-b border-gray-200 px-6 py-2 text-sm bg-white'>
			<div className='flex items-center gap-x-4' style={{
				transform: `translate(${navX}px)`
			}} >
			<StoreSwitcher items={items} />
			<ol className='flex gap-4'>
					{
						routes.map((route) => (
							<>
								<li aria-hidden className='text-muted-foreground'>
									/
								</li>
								<Link
									key={route.href}
									href={route.href}
									className={cn(
										'text-sm font-medium transition-colors hover:text-primary',
										route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
									)}
								>
									{route.label}
								</Link>
							</>
						))
					}
				</ol>
			</div>
			</nav>
		</>
	)
}