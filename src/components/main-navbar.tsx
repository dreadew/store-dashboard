'use client'

import { cn } from '@/lib/utils'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SignInButton } from './auth/sign-in-button'
import { SignOutButton } from './auth/sign-out-button'
import { SignUpButton } from './auth/sign-up-button'
import { Button } from './ui/button'
import { Popover } from './ui/popover'

interface MainNavbarProps {
	mode: 'default' | 'dashboard' | 'store'
}

export const MainNavbar = ({ mode = 'default' }: MainNavbarProps) => {
	const pathname = usePathname()
	const router = useRouter()
	const { data: session } = useSession()

	const routes =
		session?.user.role === 'admin'
			? [
					{
						href: '/',
						label: 'Главная',
						active: pathname === '/',
					},
					{
						href: '/dashboard',
						label: 'Дэшборд',
						active: pathname === '/dashboard',
					},
					{
						href: '/store',
						label: 'Магазин',
						active: pathname === '/store',
					},
			  ]
			: [
					{
						href: '/',
						label: 'Главная',
						active: pathname === '/',
					},
					{
						href: '/store',
						label: 'Магазин',
						active: pathname === '/store',
					},
			  ]

	return (
		<header
			className={cn(
				'flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 text-sm',
				mode === 'dashboard' ? '' : 'sticky top-0'
			)}
		>
			<div className='flex items-center gap-6 w-full justify-between md:justify-normal'>
				{mode === 'dashboard' ? (
					<Link href='/'>
						<svg
							width='36'
							height='36'
							viewBox='0 0 48 48'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M16.757 2C16.757 0.895431 17.6524 0 18.757 0H29.1399C30.2444 0 31.1399 0.895431 31.1399 2V12.0832C31.1399 13.865 33.2942 14.7574 34.5541 13.4974L44.5735 3.47725C45.8327 2.21798 47.9859 3.10846 47.9878 4.88926L48.0013 17.4324C48.0018 17.9608 47.7933 18.468 47.4211 18.8431L34.5673 31.7999C33.7916 32.5818 33.7941 33.8438 34.5729 34.6226L44.5217 44.5722C45.7809 45.8314 44.8904 47.9844 43.1096 47.9863L30.3426 48.0001C29.8087 48.0007 29.2967 47.7877 28.9206 47.4087L25.4215 43.8815C24.6392 43.0929 23.3641 43.0929 22.5818 43.8815L19.0827 47.4087C18.7066 47.7877 18.1946 48.0007 17.6607 48.0001L4.89367 47.9863C3.11294 47.9844 2.22244 45.8314 3.48156 44.5722L13.4304 34.6226C14.2092 33.8438 14.2117 32.5818 13.436 31.7999L0.582198 18.8431C0.210049 18.468 0.00147762 17.9608 0.00204551 17.4324L0.0155258 4.88927C0.0174397 3.10846 2.17062 2.21799 3.42979 3.47725L13.3427 13.3909C14.6026 14.6509 16.757 13.7586 16.757 11.9767V2Z'
								fill='#232323'
							/>
						</svg>
					</Link>
				) : (
					<Link href='/'>
						<svg
							width='36'
							height='36'
							viewBox='0 0 48 48'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M16.757 2C16.757 0.895431 17.6524 0 18.757 0H29.1399C30.2444 0 31.1399 0.895431 31.1399 2V12.0832C31.1399 13.865 33.2942 14.7574 34.5541 13.4974L44.5735 3.47725C45.8327 2.21798 47.9859 3.10846 47.9878 4.88926L48.0013 17.4324C48.0018 17.9608 47.7933 18.468 47.4211 18.8431L34.5673 31.7999C33.7916 32.5818 33.7941 33.8438 34.5729 34.6226L44.5217 44.5722C45.7809 45.8314 44.8904 47.9844 43.1096 47.9863L30.3426 48.0001C29.8087 48.0007 29.2967 47.7877 28.9206 47.4087L25.4215 43.8815C24.6392 43.0929 23.3641 43.0929 22.5818 43.8815L19.0827 47.4087C18.7066 47.7877 18.1946 48.0007 17.6607 48.0001L4.89367 47.9863C3.11294 47.9844 2.22244 45.8314 3.48156 44.5722L13.4304 34.6226C14.2092 33.8438 14.2117 32.5818 13.436 31.7999L0.582198 18.8431C0.210049 18.468 0.00147762 17.9608 0.00204551 17.4324L0.0155258 4.88927C0.0174397 3.10846 2.17062 2.21799 3.42979 3.47725L13.3427 13.3909C14.6026 14.6509 16.757 13.7586 16.757 11.9767V2Z'
								fill='#232323'
							/>
						</svg>
					</Link>
				)}
				<div className='flex items-center justify-center md:hidden'>
					<Popover>
						<div className='relative'>
							<PopoverTrigger className='self-end' asChild>
								<Button variant='outline'>Меню</Button>
							</PopoverTrigger>
							<PopoverContent className='fixed top-2 right-[-2.2rem] flex flex-col gap-y-2 p-3 min-w-[150px] border-gray-200 bg-white border-[1px] rounded-lg shadow-xl text-center'>
								{routes.map((route, idx) => (
									<Link
										key={`main-route-${idx}`}
										href={route.href}
										className={cn(
											'text-sm font-medium transition-colors hover:text-primary',
											route.active ? 'text-gray-900' : 'text-muted-foreground'
										)}
									>
										{route.label}
									</Link>
								))}
								{session?.user ? (
									<>
										<Button size='sm'>
											<Link href='/profile'>Профиль</Link>
										</Button>
										<Button
											variant='outline'
											size='sm'
											onClick={() => router.push('/cart')}
										>
											Корзина
										</Button>
										<SignOutButton className='relative'>
											<Button className='w-full' size='sm' variant='outline'>
												выйти
											</Button>
										</SignOutButton>
									</>
								) : (
									<div className='flex flex-col gap-x-2'>
										<SignInButton className='relative'>
											<Button size='sm'>войти в аккаунт</Button>
										</SignInButton>
										<SignUpButton className='relative'>
											<Button size='sm' variant='outline'>
												зарегистрироваться
											</Button>
										</SignUpButton>
									</div>
								)}
							</PopoverContent>
						</div>
					</Popover>
				</div>
				<ol className='hidden relative md:flex gap-4 px-0 text-muted-foreground'>
					{routes.map((route, idx) => (
						<Link
							key={`main-route-${idx}`}
							href={route.href}
							className={cn(
								'text-sm font-medium transition-colors hover:text-primary',
								route.active ? 'text-gray-900' : 'text-muted-foreground'
							)}
						>
							{route.label}
						</Link>
					))}
				</ol>
			</div>
			<div className='md:flex gap-x-3 hidden'>
				{session?.user ? (
					<>
						<Button size='sm'>
							<Link href='/profile'>Профиль</Link>
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => router.push('/cart')}
						>
							Корзина
						</Button>
						<SignOutButton className='relative'>
							<Button size='sm' variant='outline'>
								выйти
							</Button>
						</SignOutButton>
					</>
				) : (
					<div className='flex gap-x-2'>
						<SignInButton className='relative'>
							<Button size='sm'>войти в аккаунт</Button>
						</SignInButton>
						<SignUpButton className='relative'>
							<Button size='sm' variant='outline'>
								зарегистрироваться
							</Button>
						</SignUpButton>
					</div>
				)}
			</div>
		</header>
	)
}
