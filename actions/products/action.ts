'use server';

import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { products } from '@/database/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
	product_id: z.number().optional(),
	name: z.string().min(1, 'Name is required'),
	unit: z.string().min(1, 'Unit is required'),
	price: z.number().positive('Price must be positive'),
	stock: z.number().int('Stock must be an integer').nonnegative('Stock must be non-negative'),
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

	revalidatePath('/products');
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

	revalidatePath('/sales');
	revalidatePath('/products');
	revalidatePath('/procurements');
	revalidatePath('/products/' + result.data.product_id);
}

export async function remove(id: number) {
	const product = await find(id);
	if (!product) throw new Error('Product not found');

	await db.delete(products).where(eq(products.product_id, id));

	revalidatePath('/sales');
	revalidatePath('/products');
	revalidatePath('/procurements');
}
