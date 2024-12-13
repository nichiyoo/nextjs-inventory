// export type Product = {
// 	id: string;
// 	name: string;
// 	unit: string;
// 	stock: number;
// 	category: string;
// 	price: number;
// };

// type Transaction = {
// 	id: string;
// 	product: Product;
// 	quantity: number;
// 	date: string;
// 	total: number;
// };

// export type User = {
// 	id: string;
// 	name: string;
// 	email: string;
// 	role: 'user' | 'admin';
// };

import { products, transactions, users } from '@/database/schema';

import { InferSelectModel } from 'drizzle-orm';

export type Product = InferSelectModel<typeof products>;
export type Transaction = InferSelectModel<typeof transactions>;

export type Sales = Omit<Transaction, 'type'> & { type: 'sales' };
export type Procurement = Omit<Transaction, 'type'> & { type: 'procurements' };

export type User = InferSelectModel<typeof users>;

export interface ToastProps {
	title: string;
	description: string;
	variant?: 'default' | 'destructive';
}
