import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

const current = sql`(unixepoch())`;

export const products = sqliteTable('products', {
	product_id: integer('product_id').primaryKey(),
	name: text('name').notNull(),
	unit: text('unit').notNull(),
	price: real('price').notNull(),
	stock: integer('stock').notNull(),
	holding_cost: real('holding_cost').notNull(),
	order_cost: real('order_cost').notNull(),
	created_at: integer('created_at', { mode: 'timestamp' }).notNull().default(current),
	updated_at: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(current)
		.$onUpdate(() => current),
});

export const transactions = sqliteTable('transactions', {
	transaction_id: integer('transaction_id').primaryKey(),
	product_id: integer('product_id')
		.references(() => products.product_id, {
			onDelete: 'cascade',
			onUpdate: 'cascade',
		})
		.notNull(),
	quantity: integer('quantity').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	total: real('total').notNull(),
	type: text('type', {
		enum: ['sales', 'procurements'],
	})
		.notNull()
		.default('sales'),
	created_at: integer('created_at', { mode: 'timestamp' }).notNull().default(current),
	updated_at: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(current)
		.$onUpdate(() => current),
});

export const users = sqliteTable('users', {
	user_id: integer('user_id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	role: text('role').notNull().default('user'),
	created_at: integer('created_at', { mode: 'timestamp' }).notNull().default(current),
	updated_at: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(current)
		.$onUpdate(() => current),
});

export const productsRelations = relations(products, (relation) => {
	return {
		transactions: relation.many(transactions),
	};
});

export const transactionsRelations = relations(transactions, (relation) => {
	return {
		product: relation.one(products, {
			fields: [transactions.product_id],
			references: [products.product_id],
		}),
	};
});
