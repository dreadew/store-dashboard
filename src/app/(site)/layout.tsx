import { MainNavbar } from '@/components/main-navbar'

interface MainLayoutProps {
	children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<main className='min-h-[100vh]'>
			<MainNavbar mode='default' />
			{children}
		</main>
	)
}
