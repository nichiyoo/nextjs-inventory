import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { TransactionForm } from '@/components/transactions/form';
import { create } from '@/actions/transactions/action';
import db from '@/lib/drizzle';

export const dynamic = 'force-dynamic';

export default async function Page(): Promise<React.JSX.Element> {
	const products = await db.query.products.findMany();

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Create Transaction</HeaderTitle>
				<HeaderDescription>
					Log new sales or procurement transactions, adjusting inventory levels automatically.
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<TransactionForm products={products} actions={create} mode='create' />
			</div>
		</div>
	);
}
