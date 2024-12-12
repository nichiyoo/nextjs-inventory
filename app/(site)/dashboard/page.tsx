import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';
import { compactNumber, delay } from '@/lib/utils';

import { Chart } from './chart';
import { StatCard } from '@/components/stat';
import { TrendingUp } from 'lucide-react';

export default async function Page(): Promise<React.JSX.Element> {
	await delay(2000);

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Dashboard</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<div className='grid lg:grid-cols-4 gap-6'>
				<StatCard title='Jenis Produk' value={compactNumber(143)} icon={TrendingUp} />
				<StatCard title='Stok Produk' value={compactNumber(9052)} icon={TrendingUp} />
				<StatCard title='Penjualan Produk' value={compactNumber(234823843)} icon={TrendingUp} />
				<StatCard title='Total Transaction' value={compactNumber(94823843)} icon={TrendingUp} />
			</div>

			<Chart />
		</div>
	);
}
