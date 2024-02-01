'use client'

import axios from 'axios'
import { useState } from 'react'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { CodeInput } from './code-input'

interface CodeInputFormProps {
	user_id: number
}

export const CodeInputForm = ({ user_id }: CodeInputFormProps) => {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()

	const onCodeSubmit = async (code: string) => {
		setError('')
		setSuccess('')

		try {
			await axios
				.post('http://localhost:3030/users/verify', {
					user_id,
					verification_code: code,
				})
				.then(callback => {
					if (callback.status == 401) {
						setError('invalid code')
					}
					setSuccess('email confirmed successfully')
				})
		} catch (err: any) {
			setError('invalid code')
		}
	}

	return (
		<div className='flex flex-col gap-y-2'>
			<CodeInput length={6} onCodeSubmit={onCodeSubmit} />
			<FormError message={error} />
			<FormSuccess message={success} />
		</div>
	)
}
