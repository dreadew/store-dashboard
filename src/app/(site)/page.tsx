import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
	return (
		<main className='p-10 lg:mt-5'>
			<div className='flex text-center md:text-start gap-10 items-center lg:flex-row flex-col'>
				<div className='flex flex-col gap-y-4 w-[100%] md:w-[50%]'>
					<h1 className='text-6xl md:text-5xl sm:text-5xl font-bold tracking-tighter text-gray-900 text-balance'>
						КОЛЛЕКЦИЯ ВЕСНА/ЛЕТО 2024
					</h1>
					<p className='text-sm leading-7 text-gray-500 text-balance'>
						This season&apos;s collection brings soft washes of colour and
						gentle, natural fibres in functional yet comfortable designs to
						lighten your everyday.
					</p>
					<Button size='lg'>
						<Link href='/store'>Перейти к списку магазинов</Link>
					</Button>
				</div>
				<div className='w-full object-cover md:w-[100%]'>
					<Image
						src={
							'https://wallpapersmug.com/download/2880x1800/5490ef/architecture-modern-minimal-building-5k.jpg'
						}
						className='w-full rounded-lg object-cover'
						width={1920}
						height={1080}
						alt='hero-img'
					/>
				</div>
			</div>
		</main>
	)
}
