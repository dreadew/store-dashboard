'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input } from './input'

interface CodeInputProps {
	length: number
	onCodeSubmit: (code: string) => void
}

export const CodeInput = ({ length, onCodeSubmit }: CodeInputProps) => {
	const [code, setCode] = useState<Array<string>>(new Array(length).fill(''))
	const [isSubmited, setIsSubmited] = useState<boolean>(false)
	const inputRefs = useRef<Array<HTMLInputElement>>([])

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus()
		}
	}, [])

	const handleClick = (idx: number) => {
		inputRefs.current[idx].setSelectionRange(1, 1)

		if (idx > 0 && code.indexOf('') < idx && idx < length - 1) {
			inputRefs.current[code.indexOf('')].focus()
		}
	}

	const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (
			e.key === 'Backspace' &&
			!code[idx] &&
			idx > 0 &&
			inputRefs.current[idx - 1]
		) {
			inputRefs.current[idx - 1].focus()
		}
	}

	const handleChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (isNaN(Number(value))) return

		const newCode = [...code]
		newCode[idx] = value.substring(value.length - 1)
		setCode(newCode)

		const combinedCode = newCode.join('')
		if (combinedCode.length === length && !isSubmited) {
			setIsSubmited(true)
			onCodeSubmit(combinedCode)
			setCode(new Array(length).fill(''))

			setTimeout(() => {
				setIsSubmited(false)
			}, 5000)
		}

		if (value && idx < length - 1 && inputRefs.current[idx + 1]) {
			inputRefs.current[idx + 1].focus()
		}
	}

	return (
		<form className='flex gap-x-5'>
			{code.map((item, idx) => (
				<Input
					ref={input => {
						if (input) inputRefs.current[idx] = input
					}}
					key={idx}
					value={item}
					type='text'
					className='h-12 w-12 text-center'
					onChange={e => handleChange(idx, e)}
					onKeyDown={e => handleKeyDown(idx, e)}
					onClick={() => handleClick(idx)}
					disabled={isSubmited}
				/>
			))}
		</form>
	)
}
