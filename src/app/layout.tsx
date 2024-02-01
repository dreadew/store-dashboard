import { SessionProviders } from '@/components/session-provider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
	title: 'Dreadew',
	description: 'Some description...',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<SessionProviders>{children}</SessionProviders>
			</body>
		</html>
	)
}
