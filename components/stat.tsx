import * as React from 'react';

import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
	title: string;
	value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
	return (
		<div className='p-4 border border-border rounded-xl bg-card flex flex-col gap-4 relative'>
			<div className='absolute top-0 right-0 m-4'>
				<TrendingUp className='size-5 text-primary' />
			</div>
			<h5 className='text-muted-foreground'>{title}</h5>
			<span className='text-4xl font-bold font-display'>{value}</span>
		</div>
	);
};
