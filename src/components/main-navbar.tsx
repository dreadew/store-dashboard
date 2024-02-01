'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { SignOutButton } from './auth/sign-out-button'
import { SignInButton } from './auth/sign-in-button'
import { Button } from './ui/button'
import { SignUpButton } from './auth/sign-up-button'

interface MainNavbarProps {
	logoScale?: number
	mode: 'default' | 'dashboard'
}

export const MainNavbar = ({logoScale, mode='default'}: MainNavbarProps) => {
	const pathname = usePathname()
	const {data: session} = useSession()

	const routes = [
		{
			href: '/',
			label: 'home',
			active: pathname === '/'
		},
		{
			href: '/dashboard',
			label: 'dashboard',
			active: pathname === '/dashboard'
		},
		{
			href: '/store',
			label: 'store',
			active: pathname === '/store'
		}
	]

	return (
		<header className={
			cn(
				'flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 text-sm', mode === 'dashboard' ? 'pl-16' : 'fixed w-full'
			)
		}>
				<div className='flex items-center gap-4'>
					{
						mode === 'dashboard' ? (
							<svg
								style={{
									transform: `scale(${logoScale})`
								}}
								className='fixed left-6 top-4 z-10'
								aria-label='Vercel logo'
								fill='black'
								viewBox='0 0 75 65'
								height='22'
							>
								<path d='M37.59.25136.95 64H.64136.95-64z'></path>
							</svg>
						) : (
							<svg
								className='relative'
								aria-label='Vercel logo'
								fill='black'
								viewBox='0 0 75 65'
								height='22'
							>
								<path d='M37.59.25136.95 64H.64136.95-64z'></path>
							</svg>
						)
					}
					<ol className='relative flex gap-4 px-0 text-gray-700'>
					{
							routes.map((route) => (
								<>
									<Link
										key={route.href}
										href={route.href}
										className={cn(
											'text-sm font-medium transition-colors hover:text-primary',
											route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
										)}
									>
										{route.label}
									</Link>
								</>
							))
						}
					</ol>
				</div>
				<div>
					{
						session?.user ? (
							mode === 'dashboard' ? (
								<SignOutButton className='fixed right-6 top-2 z-10'>
								<Button size='sm' variant='outline'>
									sign out
								</Button>
							</SignOutButton>
							) : (
								<SignOutButton className='relative'>
								<Button variant='outline'>
									sign out
								</Button>
							</SignOutButton>
							)
						) : (
							<div className='flex gap-x-2'>
								<SignInButton className='relative'>
									<Button>
										sign in
									</Button>
								</SignInButton>
								<SignUpButton className='relative'>
									<Button variant='outline'>
										sign up
									</Button>
								</SignUpButton>
							</div>
						)
					}
				</div>
			</header>
	)
}