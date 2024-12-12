import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export default async function Loading(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<div className='flex flex-col gap-2'>
				<Skeleton className='w-3/4 h-12 bg-muted' />
				<Skeleton className='w-full h-6 bg-muted' />
			</div>

			<Skeleton className='w-full h-96 bg-muted' />
		</div>
	);
}
