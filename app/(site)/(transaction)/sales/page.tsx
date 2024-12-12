import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { DefaultTable } from '@/components/data-table/default-table';
import { columns } from '../columns';
import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { transactions } from '@/database/schema';
import { types } from '@/lib/contant';

export default async function Page(): Promise<React.JSX.Element> {
	const data = await db.query.transactions.findMany({
		where: eq(transactions.type, types.sales),
		with: {
			product: true,
		},
	});

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Sales Data</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<DefaultTable columns={columns} data={data} />
		</div>
	);
}
