import { SignInButton } from './auth/sign-in-button'
import { Button } from './ui/button'

export const AuthForm = () => {
	return (
		<>
			<h1 className='text-grey-900 text-6xl font-semibold'>auth</h1>
			<p className='text-grey-600 text-sm font-regular'>
				a simple authentication service
			</p>
			<div>
				<SignInButton>
					<Button variant='default' size='lg' className='w-full'>
						sign in
					</Button>
				</SignInButton>
			</div>
		</>
	)
}
