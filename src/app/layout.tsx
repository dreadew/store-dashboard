import { SessionProviders } from '@/components/session-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const poppins = Inter({
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
