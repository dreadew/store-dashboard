import { MainNavbar } from '@/components/main-navbar'

interface MainLayoutProps {
	children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<>
			<MainNavbar mode='default' />
			{children}
		</>
	)
}
