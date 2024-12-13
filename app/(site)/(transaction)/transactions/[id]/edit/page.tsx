import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { TransactionForm } from '@/components/transactions/form';
import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { transactions } from '@/database/schema';
import { update } from '@/actions/transactions/action';

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function Page(props: PageProps): Promise<React.JSX.Element> {
	const params = await props.params;
	const { id } = params;

	const products = await db.query.products.findMany();
	const data = await db.query.transactions.findFirst({
		where: eq(transactions.transaction_id, Number(id)),
	});

	if (!data) notFound();

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Edit Transaction</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<TransactionForm products={products} actions={update} mode='edit' defaultValues={data} />
			</div>
		</div>
	);
}
