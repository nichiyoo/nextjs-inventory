import * as React from 'react';

import Link from 'next/link';
import { Logo } from '@/components/logo';

export default async function Layout({ children }: React.PropsWithChildren): Promise<React.JSX.Element> {
	return (
		<div className='flex flex-col h-screen w-full items-center justify-center px-4'>
			<div className='w-full max-w-md flex flex-col gap-4'>
				<Link href='/'>
					<Logo />
				</Link>
				{children}
			</div>
		</div>
	);
}
