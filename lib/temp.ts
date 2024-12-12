import { Procurement, Product, Sales, Transaction, User } from './types';

export const products: Product[] = [
	{
		product_id: 1,
		name: 'Product Satu',
		stock: 235,
		unit: 'Pcs',
		category: 'Frozen Food',
		price: 100000,
	},
	{
		product_id: 2,
		name: 'Product Dua',
		stock: 546,
		unit: 'Pcs',
		category: 'Frozen Food',
		price: 200000,
	},
	{
		product_id: 3,
		name: 'Product Tiga',
		stock: 435,
		unit: 'Pcs',
		category: 'Frozen Food',
		price: 300000,
	},
	{
		product_id: 4,
		name: 'Product Empat',
		stock: 234,
		unit: 'Pcs',
		category: 'Frozen Food',
		price: 400000,
	},
];

function* generator() {
	let i = 0;
	while (true) {
		yield i++;
	}
}

const counter = generator();

const transactions = products
	.map((product) => {
		return Array.from({ length: 3 }, () => {
			const binary = Math.random() < 0.5;
			const quantity = Math.floor(Math.random() * 100);

			return {
				transaction_id: counter.next().value,
				product,
				quantity: quantity,
				date: new Date(2024, 6, 1).toISOString(),
				total: product.price * quantity,
				type: binary ? 'procurements' : 'sales',
			} as (Sales | Procurement) & {
				product: Product;
			};
		});
	})
	.flat();

export const sales: Array<Sales & { product: Product }> = transactions.filter(
	(transaction) => transaction.type === 'sales'
);

export const procurements: Array<Procurement & { product: Product }> = transactions.filter(
	(transaction) => transaction.type === 'procurements'
);

export const user: User[] = [
	{
		user_id: 1,
		name: 'Admin',
		email: 'admin@example.com',
		role: 'admin',
	},
	{
		user_id: 2,
		name: 'User',
		email: 'user@example.com',
		role: 'user',
	},
];
