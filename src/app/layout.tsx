import { SessionProviders } from '@/components/session-provider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '../../providers/modal-provider'
import { MainNavbar } from '@/components/main-navbar'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
	title: 'dreadew',
	description: 'some description...',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<SessionProviders>
					{/*<ModalProvider />*/}
					{children}
				</SessionProviders>
			</body>
		</html>
	)
}
