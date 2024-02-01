import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
import { SignOutButton } from './auth/sign-out-button'
import { Button } from './ui/button'
import { CodeInputForm } from './ui/code-input-form'

export const UserProfile = ({ session }: { session: Session }) => {
	return (
		<div className='flex flex-col gap-y-2'>
			<h1>Hello, {session?.user.username}</h1>
			<div className='flex items-center space-x-2'>
				<p>Email: {session?.user.email}</p>
				<span
					className={cn(
						'text-xs p-2 rounded-lg font-medium',
						session.user.email_verified
							? 'bg-emerald-500/15 text-emerald-500'
							: 'bg-destructive/15 text-destructive'
					)}
				>
					{session.user.email_verified ? 'verified' : 'not verified'}
				</span>
			</div>
			{!session.user.email_verified && (
				<CodeInputForm user_id={session?.user.id} />
			)}
			<SignOutButton>
				<Button variant='default' size='lg' className='w-full'>
					sign out
				</Button>
			</SignOutButton>
		</div>
	)
}
