'use client'

import { MainNavbar } from './main-navbar'
import { StoresNavbar } from './stores-navbar'

export const DashboardNavbar = () => {
	return (
		<>
			<MainNavbar mode='dashboard' />
			<StoresNavbar />
		</>
	)
}
