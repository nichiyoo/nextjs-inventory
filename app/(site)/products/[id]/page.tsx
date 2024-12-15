import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';
import { eachMonthOfInterval, isSameMonth, subYears } from 'date-fns';

import { Chart } from '@/components/products/chart';
import { DefaultTable } from '@/components/data-table/default-table';
import ProductDetail from '@/components/products/detail';
import { columns } from '@/components/transactions/columns';
import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { forecast } from '@/actions/products/action';
import { notFound } from 'next/navigation';
import { products } from '@/database/schema';
import { types } from '@/lib/contant';

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function Page(props: PageProps): Promise<React.JSX.Element> {
	const params = await props.params;

	const { id } = params;
	const data = await db.query.products.findFirst({
		where: eq(products.product_id, Number(id)),
		with: {
			transactions: true,
		},
	});

	if (!data) notFound();

	const { transactions, ...product } = data;
	const result = await forecast(product.product_id);

	const end = new Date();
	const start = subYears(end, 1);
	const range = eachMonthOfInterval({ start, end });

	const monthly = range.map((date) => {
		const sales = data.transactions.filter((item) => item.type === types.sales && isSameMonth(item.date, date));
		const actual = sales.reduce((acc, curr) => acc + curr.quantity, 0);

		const predicted = result.past.find((item: { month: Date }) => isSameMonth(item.month, date));
		const future = result.future.find((item: { month: Date }) => isSameMonth(item.month, date));

		return {
			date: date,
			actual: Math.abs(actual),
			predicted: predicted ? Math.round(predicted.quantity) : future ? Math.round(future.quantity) : 0,
		};
	});

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Product Detail</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda
					natus dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<ProductDetail
				product={data}
				calculation={{
					forecast: result.future[0].quantity,
					average: result.average,
					eoq: result.eoq,
					rop: result.rop,
				}}
			/>

			<Chart
				title='Monthly Sales'
				description='Showing total sales for the last years and the predicted value'
				data={monthly}
			/>

			<DefaultTable
				columns={columns}
				data={transactions.map((transaction) => {
					return {
						...transaction,
						product,
					};
				})}
			/>
		</div>
	);
}
