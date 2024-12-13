'use server';

import { eq, sum } from 'drizzle-orm';
import { products, transactions } from '@/database/schema';

import db from '@/lib/drizzle';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
	transaction_id: z.number().optional(),
	product_id: z.number(),
	quantity: z.number().int('Quantity must be an integer').positive('Quantity must be positive'),
	date: z.date({
		required_error: 'Date is required',
		invalid_type_error: "That's not a date!",
	}),
	total: z.number().positive('Total must be positive'),
	type: z.enum(['sales', 'procurements']),
});

async function find(id: number) {
	return await db.query.transactions.findFirst({
		where: eq(transactions.transaction_id, id),
	});
}

async function total(product_id: number) {
	const result = await db
		.select({
			stock: sum(products.stock),
		})
		.from(transactions)
		.where(eq(transactions.product_id, product_id));

	return Number(result[0].stock);
}

export async function create(data: z.infer<typeof schema>) {
	const result = schema.safeParse(data);
	if (!result.success) throw result.error;

	const multiplier = result.data.type === 'sales' ? -1 : 1;
	await db.transaction(async (tx) => {
		await db.insert(transactions).values({
			...result.data,
			quantity: result.data.quantity * multiplier,
		});
		const stock = await total(result.data.product_id);
		await tx.update(products).set({ stock: stock }).where(eq(products.product_id, result.data.product_id));
	});

	revalidatePath('/products');
	revalidatePath('/transactions');
	revalidatePath('/products/' + result.data.product_id);
}

export async function update(data: z.infer<typeof schema>) {
	const result = schema.safeParse(data);
	if (!result.success) throw result.error;
	if (!result.data.transaction_id) throw new Error('Transaction ID is required for update');

	const transaction = await find(result.data.transaction_id);
	if (!transaction) throw new Error('Transaction not found');

	const multiplier = result.data.type === 'sales' ? -1 : 1;
	await db.transaction(async (tx) => {
		await tx.insert(transactions).values({
			...result.data,
			quantity: result.data.quantity * multiplier,
		});

		const stock = await total(result.data.product_id);
		await tx.update(products).set({ stock: stock }).where(eq(products.product_id, result.data.product_id));
	});

	revalidatePath('/products');
	revalidatePath('/transactions');
	revalidatePath('/products/' + result.data.product_id);
}

export async function remove(id: number) {
	const transaction = await find(id);
	if (!transaction) throw new Error('Transaction not found');

	await db.transaction(async (tx) => {
		await tx.delete(transactions).where(eq(transactions.transaction_id, id));
		const stock = await total(transaction.product_id);
		await tx.update(products).set({ stock: stock }).where(eq(products.product_id, transaction.product_id));
	});

	revalidatePath('/transactions');
}
