'use server';

import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { users } from '@/database/schema';
import { z } from 'zod';

const schema = z.object({
	user_id: z.number().optional(),
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	role: z.enum(['user', 'admin']),
});

async function find(id: number) {
	return await db.query.users.findFirst({
		where: eq(users.user_id, id),
	});
}

export async function create(data: z.infer<typeof schema>) {
	const result = schema.safeParse(data);
	if (!result.success) throw result.error;

	await db.insert(users).values(result.data);
	revalidateTag('users');
}

export async function update(data: z.infer<typeof schema>) {
	const result = schema.safeParse(data);
	if (!result.success) throw result.error;
	if (!result.data.user_id) throw new Error('User ID is required for update');

	const user = await find(result.data.user_id);
	if (!user) throw new Error('User not found');

	await db.update(users).set(result.data).where(eq(users.user_id, result.data.user_id));
	revalidateTag('users');
}

export async function remove(id: number) {
	const user = await find(id);
	if (!user) throw new Error('User not found');

	await db.delete(users).where(eq(users.user_id, id));
	revalidateTag('users');
}
