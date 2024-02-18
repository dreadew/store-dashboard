'use client'

import { useState } from 'react'
import { verify } from '../../../actions/user'
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
			await verify(user_id, Number(code)).then(callback => {
				if (!callback.user) {
					setError('invalid code')
				}
				setSuccess('email confirmed successfully')
			})
		} catch (err: any) {
			console.log(err)
			setError('invalid code')
		}
	}

	return (
		<div className='flex flex-col gap-y-2'>
			<h4 className='text-sm leading-6 text-muted-foreground'>
				Введите код, отправленный на электронную почту
			</h4>
			<CodeInput length={6} onCodeSubmit={onCodeSubmit} />
			<FormError message={error} />
			<FormSuccess message={success} />
		</div>
	)
}
