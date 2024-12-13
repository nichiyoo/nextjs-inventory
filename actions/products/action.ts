'use server';

import { addMonths, eachDayOfInterval, isSameDay, startOfMonth, subYears } from 'date-fns';

// @ts-expect-error no types for arima library
import ARIMA from 'arima';
import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { products } from '@/database/schema';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
	product_id: z.number().optional(),
	name: z.string().min(1, 'Name is required'),
	unit: z.string().min(1, 'Unit is required'),
	price: z.number().positive('Price must be positive'),
	stock: z.number().int('Stock must be an integer'),
	holding_cost: z.number().nonnegative('Holding cost must be non-negative'),
	order_cost: z.number().nonnegative('Order cost must be non-negative'),
});

async function find(id: number) {
	return await db.query.products.findFirst({
		where: eq(products.product_id, id),
	});
}

export async function create(data: z.infer<typeof schema>) {
	const result = schema.safeParse(data);
	if (!result.success) throw result.error;

	await db.insert(products).values(result.data);
	revalidateTag('products');
}

export async function update(data: z.infer<typeof schema>) {
	const result = schema.safeParse(data);
	if (!result.success) throw result.error;
	if (!result.data.product_id) throw new Error('Product ID is required for update');

	const product = await find(result.data.product_id);
	if (!product) throw new Error('Product not found');

	await db
		.update(products)
		.set({
			...result.data,
			updated_at: new Date(),
		})
		.where(eq(products.product_id, result.data.product_id));

	revalidateTag('products');
	revalidateTag('transactions');
}

export async function remove(id: number) {
	const product = await find(id);
	if (!product) throw new Error('Product not found');

	await db.delete(products).where(eq(products.product_id, id));

	revalidateTag('products');
	revalidateTag('transactions');
}

interface DailyData {
	date: Date;
	quantity: number;
}

interface MonthlyData {
	month: Date;
	quantity: number;
	avergae: number;
}

export async function forecast(id: number) {
	const data = await db.query.products.findFirst({
		where: eq(products.product_id, id),
		with: {
			transactions: true,
		},
	});

	if (!data) throw new Error('Product not found');

	const end = new Date();
	const start = subYears(end, 1);
	const range = eachDayOfInterval({ start, end });

	const daily: DailyData[] = range.map((date) => {
		const sales = data.transactions.filter((item) => isSameDay(item.date, date));
		return {
			date: date,
			quantity: sales.reduce((acc, curr) => acc + Math.abs(curr.quantity), 0),
		};
	});

	const monthly: MonthlyData[] = [];
	const groups = daily.reduce((acc, item) => {
		const month = startOfMonth(item.date).toISOString();
		if (!acc[month]) acc[month] = [];
		acc[month].push(item.quantity);
		return acc;
	}, {} as Record<string, number[]>);

	Object.entries(groups).forEach(([month, quantities]) => {
		const total = quantities.reduce((sum, quantity) => sum + quantity, 0);
		const average = quantities.reduce((sum, quantity) => sum + quantity, 0) / quantities.length;

		monthly.push({
			month: new Date(month),
			quantity: total,
			avergae: average,
		});
	});

	monthly.sort((a, b) => a.month.getTime() - b.month.getTime());
	const arima = new ARIMA({
		p: 1,
		d: 0,
		q: 1,
		verbose: false,
	});

	await arima.fit(monthly.map((month) => month.quantity));
	const [pastForecast] = arima.predict(12);
	const [futureForecast] = arima.predict(1);

	const total = monthly.reduce((sum, item) => sum + item.quantity, 0);
	const average = total / monthly.length;
	const annual = average * 12;

	const eoq = Math.sqrt((2 * data.order_cost * annual) / data.holding_cost);

	const lead = 2;
	const score = 1.96;
	const stdev = deviation(monthly.map((m) => m.quantity));

	const safe = stdev * score;
	const rop = (average / 30) * lead + safe;

	const past = pastForecast.map((quantity: number, index: number) => ({
		month: addMonths(start, index),
		quantity: quantity,
		type: 'past_forecast',
	}));

	const future = futureForecast.map((quantity: number, index: number) => ({
		month: end,
		quantity: quantity,
		type: 'future_forecast',
	}));

	return {
		monthly,
		past,
		future,
		average,
		eoq,
		rop,
		safe,
	};
}

function deviation(values: number[]): number {
	const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
	const diff = values.map((value) => Math.pow(value - avg, 2));
	const avgdiff = diff.reduce((sum, val) => sum + val, 0) / values.length;

	return Math.sqrt(avgdiff);
}
