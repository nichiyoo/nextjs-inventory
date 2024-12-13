'use server';

import { and, between, count, eq, sum } from 'drizzle-orm';
import { eachDayOfInterval, isSameDay, subMonths } from 'date-fns';
import { products, transactions } from '@/database/schema';

import db from '@/lib/drizzle';
import { types } from '@/lib/contant';

export async function getStats() {
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

	const daily = range.map((date) => {
		const sale = sales.filter((item) => isSameDay(item.date, date));
		const procurement = procurements.filter((item) => isSameDay(item.date, date));

		return {
			date: date,
			sales: sale.length ? sale.reduce((acc, curr) => acc + curr.total, 0) : 0,
			procurements: procurement.length ? procurement.reduce((acc, curr) => acc + curr.total, 0) : 0,
		};
	});

	return {
		countProducts,
		totalStock,
		totalSales: sales.reduce((acc, curr) => acc + curr.total, 0),
		totalProcurements: procurements.reduce((acc, curr) => acc + curr.total, 0),
		daily,
	};
}
