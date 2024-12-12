import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Page() {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='text-3xl font-bold font-display'>Register</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>

			<CardContent>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<Label htmlFor='username'>Username</Label>
						<Input id='username' type='username' placeholder='username' required />
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' type='email' placeholder='m@example.com' required />
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<Input id='password' type='password' required placeholder='Password' />
					</div>

					<div className='grid gap-2'>
						<Label htmlFor='confirmation'>Password confirmation</Label>
						<Input id='confirmation' type='confirmation' required placeholder='Confirm password' />
					</div>

					<div className='grid gap-2'>
						<div className='flex items-center'>
							<Checkbox id='terms' name='terms' required className='rounded-[0.25rem]' />
							<Label htmlFor='terms' className='ml-2'>
								I agree to the Terms and Conditions
							</Label>
						</div>
					</div>

					<Button type='submit' className='w-full'>
						Register
					</Button>
				</div>
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/auth/signin' className='text-primary'>
						Sign In
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
