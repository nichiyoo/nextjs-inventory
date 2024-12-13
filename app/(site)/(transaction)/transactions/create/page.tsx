import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { TransactionForm } from '@/components/transactions/form';
import { create } from '@/actions/transactions/action';
import db from '@/lib/drizzle';

export default async function Page(): Promise<React.JSX.Element> {
	const data = await db.query.products.findMany();

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Create Transaction</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<TransactionForm products={data} actions={create} mode='create' />
			</div>
		</div>
	);
}
