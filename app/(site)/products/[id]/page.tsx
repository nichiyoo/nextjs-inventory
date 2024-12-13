import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { DefaultTable } from '@/components/data-table/default-table';
import ProductDetail from '@/components/products/detail';
import { columns } from '@/components/transactions/columns';
import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { products } from '@/database/schema';

interface PageProps {
	params: {
		id: string;
	};
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const { id } = params;
	const data = await db.query.products.findFirst({
		where: eq(products.product_id, Number(id)),
		with: {
			transactions: true,
		},
	});

	if (!data) notFound();
	const { transactions, ...product } = data;

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Product Detail</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<ProductDetail product={data} />
			<DefaultTable
				columns={columns}
				data={transactions.map((t) => ({
					...t,
					product,
				}))}
			/>
		</div>
	);
}
