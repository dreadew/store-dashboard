import { MainNavbar } from '@/components/main-navbar'

interface ProfilePageLayoutProps {
	children: React.ReactNode
}

export default function ProfilePageLayout({
	children,
}: ProfilePageLayoutProps) {
	return (
		<main>
			<MainNavbar mode='default' />
			{children}
		</main>
	)
}
