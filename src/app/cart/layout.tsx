import { MainNavbar } from '@/components/main-navbar'

interface CartLayoutProps {
	children: React.ReactNode
}

export default function CartLayout({ children }: CartLayoutProps) {
	return (
		<main className='min-h-screen'>
			<MainNavbar mode='store' />
			{children}
		</main>
	)
}
