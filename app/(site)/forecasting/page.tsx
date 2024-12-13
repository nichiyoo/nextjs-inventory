import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { StatCard } from '@/components/stat';
import { compactNumber } from '@/lib/utils';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Forcasting</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<div className='grid lg:grid-cols-4 gap-6'>
				<StatCard title='Jenis Produk' value={compactNumber(143)} />
				<StatCard title='Stok Produk' value={compactNumber(9052)} />
				<StatCard title='Penjualan Produk' value={compactNumber(234823843)} />
				<StatCard title='Total Transaction' value={compactNumber(94823843)} />
			</div>
		</div>
	);
}
