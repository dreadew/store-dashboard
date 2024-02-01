'use client'

import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface MarkElement {
	number: number,
	location: Array<number>
}

interface CaptchaData {
	icon_num: number,
	icon_name: string,
	x: Array<number>,
	y: Array<number>
}

interface CaptchaProps {
	verified: boolean
	setOpen: (value: boolean) => void
	setVerified: (value: boolean) => void
}

export const Captcha = ({ verified, setOpen, setVerified }: CaptchaProps) => {
	const [captchaImage, setCaptchaImage] = useState(null)
	const [captchaData, setCaptchaData] = useState<CaptchaData[]>()
	const [icons, setIcons] = useState<Array<String>>()
	const [marks, setMarks] = useState<MarkElement[]>([])
	const [disabled, setDisabled] = useState<boolean>(false)

	const getCaptcha = async () => {
		if (!verified) {
			try {
				const response = await axios.get('http://localhost:3030/utils/captcha')
				setCaptchaImage(response.data.img)
				setCaptchaData(response.data.data)
				setIcons(response.data.icons)
				setTimeout(() => setDisabled(true), 3000)
				setDisabled(false)
				if (marks) {
					setMarks([])
				}
			} catch (err: any) {
				console.error('error generating captcha: ', err)
			}
		}
	}

	useEffect(() => {
		getCaptcha()
	}, [])

	const processCaptcha = () => {
		if (marks.length === 0) {
			return alert('you have not selected any item')
		}

		if (captchaData) {
			if (marks.length < captchaData.length) {
				return alert(`select ${captchaData.length - marks.length} more`)
			}
		}

		let incorrect = false
		captchaData?.map((item, idx) => {
			if (!(marks[idx].location[0] >= item.x[0] && marks[idx].location[0] <= item.x[1] && marks[idx].location[1] >= item.y[0] && marks[idx].location[1] <= item.y[1])) {
				incorrect = true
			}
		})

		if (incorrect) {
			setMarks([])
			return alert("you didn't pass the captcha")
		}

		getCaptcha()
		setVerified(true)
		setOpen(false)
	}

	const handleImageClick = (event: any) => {
		const { pageX, pageY  } = event
		const targetRect = event.target.getBoundingClientRect()
		const offsetX = pageX - targetRect.left - 12
		const offsetY = pageY - targetRect.top - 12

		if (captchaData) {
			if (marks.length >= captchaData.length) {
				return alert('you have already selected the maximum number of items')
			}
		}

		setMarks(prevMarks => {
			return [
				...prevMarks,
				{ location: [offsetX, offsetY], number: prevMarks.length + 1 },
			]
		})
	}

	return (
		<div className='flex flex-col gap-3 bg-white p-4'>
				<div className='flex flex-col gap-2'>
					{captchaImage && (
						<>
							<div className='relative max-w-xl flex flex-col gap-3'>
								<div className='bg-gray-100 flex items-center justify-center rounded-lg'>
									<Image
										src={`data:image/png;base64, ${captchaImage}`}
										className='rounded-lg w-full'
										alt='captcha-image'
										width={320}
										height={200}
										onClick={handleImageClick}
									/>
								</div>
								{marks && (
									<>
										{
											marks.map((mark) => (
												<div key={mark.number}
												onClick={() => setMarks(marks.filter(mk => mk.number !== mark.number))}
												className='absolute rounded-full text-white bg-indigo-600 flex items-center justify-center cursor-pointer w-6 h-6 hover:bg-indigo-700 transition-colors'
												style={{
													left: mark.location[0],
													top: mark.location[1],
												}}>
													{mark.number}
												</div>
											))
										}
									</>
								)}
								<p className='w-[400px] leading-5 flex items-center  justify-between text-sm text-gray-600 font-regular'>select the images in the correct order:{icons?.map((item, idx) => (
										<Image className='ml-2' key={`icon-${idx}`} src={`data:image/png;base64, ${item}`} alt={`icon-${idx}`} width={24} height={24} />
									))}</p>
							</div>
						</>
					)}
					<div className='flex space-x-2'>
						<Button variant='outline'  onClick={getCaptcha} disabled={!disabled}>refresh</Button>
						<Button className='w-full' onClick={processCaptcha}>check</Button>
					</div>
					<p className='font-regular text-center w-[400px] leading-5 text-xs text-gray-500'>if some icons are not visible, you should press the button</p>
				</div>
			</div>
	)
}
