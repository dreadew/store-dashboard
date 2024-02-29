import { MainNavbar } from '@/components/main-navbar'
import React from 'react'

export default async function StoreLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main>
			<MainNavbar mode='store' />
			<section className='min-h-[90vh] h-[90vh]'>{children}</section>
		</main>
	)
}
