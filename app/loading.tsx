import * as React from 'react';

import { Logo } from '@/components/logo';

export default async function Loading(): Promise<React.JSX.Element> {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<div className='motion-preset-expand animate-bounce'>
				<Logo />
			</div>
		</div>
	);
}
