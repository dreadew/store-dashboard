'use client'

import { SessionProvider } from 'next-auth/react'

interface SessionProvidersProps {
	children: React.ReactNode
}

export const SessionProviders = ({ children }: SessionProvidersProps) => {
	return <SessionProvider>{children}</SessionProvider>
}
