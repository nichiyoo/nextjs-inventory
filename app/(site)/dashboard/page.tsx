import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { Chart } from '@/components/dashboard/chart';
import { StatCard } from '@/components/stat';
import { compactNumber } from '@/lib/utils';
import { getStats } from '@/actions/dashboard/action';

export const dynamic = 'force-dynamic';

export default async function Page(): Promise<React.JSX.Element> {
	const result = await getStats();

	const stats = [
		{ id: 1, title: 'Product Types', value: result.countProducts },
		{ id: 2, title: 'Total Stock', value: result.totalStock },
		{ id: 3, title: 'Total Sales', value: result.totalSales },
		{ id: 4, title: 'Total Procurements', value: result.totalProcurements },
	];

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Dashboard</HeaderTitle>
				<HeaderDescription>
					Get a quick summary of the inventory system, including total stock levels, recent transactions, and
					alerts for low stock or reorder needs. Visualize key metrics with charts and graphs for sales trends
					and stock forecasts.
				</HeaderDescription>
			</Header>

			<div className='grid lg:grid-cols-4 gap-6'>
				{stats.map((stat) => (
					<StatCard key={stat.id} title={stat.title} value={compactNumber(stat.value)} />
				))}
			</div>

			<Chart
				title='Transactions'
				description='Showing total transactions for the last 3 months'
				data={result.daily}
			/>
		</div>
	);
}
