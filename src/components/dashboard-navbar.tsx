'use client'

import useScrollPosition from '@react-hook/window-scroll'

import { useRange } from '../../hooks/use-range'
import { MainNavbar } from './main-navbar'
import { StoresNavbar } from './stores-navbar'

export const DashboardNavbar = () => {
	const y = useScrollPosition(60)
	const navX = useRange(y, 0, 50, 0, 40)
	const logoScale = useRange(y, 0, 50, 1, 0.8)
	return (
		<>
			<MainNavbar mode='dashboard' logoScale={logoScale} />
			<StoresNavbar navX={navX} />
		</>
	)
}