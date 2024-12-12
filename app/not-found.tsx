import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function NotFound() {
	return (
		<div className='h-screen w-full justify-center items-center flex relative'>
			<div className='absolute top-0 left-0 m-8'>
				<Logo />
			</div>
			<div className='container max-w-2xl'>
				<div className='flex flex-col items-center justify-center gap-4 text-center'>
					<h2 className='text-6xl font-bold font-display'>Oops, this page doesn&apos;t exist</h2>
					<p className='text-muted-foreground'>
						The page you are looking for does not exist, or has been moved to another location, please check the URL and
						try again, if you think this is an error, please contact the site owner.
					</p>

					<Link href='/'>
						<Button>Return Home</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
