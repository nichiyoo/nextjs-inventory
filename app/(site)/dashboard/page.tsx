import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';
import { and, between, count, eq, inArray, sum } from 'drizzle-orm';
import { eachDayOfInterval, isSameDay, subMonths } from 'date-fns';
import { products, transactions } from '@/database/schema';

import { Chart } from '@/components/dashboard/chart';
import { StatCard } from '@/components/stat';
import { compactNumber } from '@/lib/utils';
import db from '@/lib/drizzle';
import { types } from '@/lib/contant';

export default async function Page(): Promise<React.JSX.Element> {
	const end = new Date();
	const start = subMonths(end, 3);
	const range = eachDayOfInterval({ start, end }).map((date) => date.toISOString());

	const filters = {
		sale: eq(transactions.type, types.sales),
		procurement: eq(transactions.type, types.procurements),
		date: between(transactions.date, start, end),
	};

	const [countProducts, totalStock] = await Promise.all([
		db.select({ value: count(products.product_id) }).from(products),
		db.select({ value: sum(products.stock) }).from(products),
	]).then((res) => {
		return res.map((item) => Number(item[0].value || 0));
	});

	const sales = await db
		.select({
			date: transactions.date,
			type: transactions.type,
			total: transactions.total,
		})
		.from(transactions)
		.where(and(filters.sale, filters.date));

	const procurements = await db
		.select({
			date: transactions.date,
			type: transactions.type,
			total: transactions.total,
		})
		.from(transactions)
		.where(filters.procurement);

	const stats = [
		{ id: 1, title: 'Product Types', value: countProducts },
		{ id: 2, title: 'Total Stock', value: totalStock },
		{ id: 3, title: 'Total Sales', value: sales.reduce((acc, curr) => acc + curr.total, 0) },
		{ id: 4, title: 'Total Procurements', value: procurements.reduce((acc, curr) => acc + curr.total, 0) },
	];

	const daily = range.map((date) => {
		const sale = sales.filter((item) => isSameDay(item.date, date));
		const procurement = procurements.filter((item) => isSameDay(item.date, date));

		return {
			date: date,
			mobile: sale.length ? sale.reduce((acc, curr) => acc + curr.total, 0) : 0,
			desktop: procurement.length ? procurement.reduce((acc, curr) => acc + curr.total, 0) : 0,
		};
	});

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
				{stats.map((stat) => (
					<StatCard key={stat.id} title={stat.title} value={compactNumber(stat.value)} />
				))}
			</div>

			<Chart title='Transactions' description='Showing total transactions for the last 3 months' data={daily} />
		</div>
	);
}
