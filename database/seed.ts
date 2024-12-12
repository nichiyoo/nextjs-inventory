import 'dotenv/config';

import * as schema from '../database/schema';

import { reset, seed } from 'drizzle-seed';

import { columns } from '@/app/(site)/(transaction)/columns';
import { create } from 'domain';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const production = {
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
};

const development = {
	url: process.env.DATABASE_FILE_NAME!,
};

export default async function main() {
	const client = createClient(process.env.NODE_ENV === 'production' ? production : development);
	const db = drizzle({
		client,
	});

	await reset(db, schema);
	await seed(db, schema).refine((fake) => {
		const count = 10;
		const names = [
			'Nugget',
			'Sosis',
			'Bakso',
			'Kentang',
			'Daging',
			'Daging Burger',
			'Cemilan',
			'Kulit',
			'Saus',
			'Minuman',
		];

		const timestamp = {
			created_at: fake.date({
				minDate: new Date('2023-01-01'),
				maxDate: new Date(),
			}),
			updated_at: fake.date({
				minDate: new Date('2023-01-01'),
				maxDate: new Date(),
			}),
		};

		return {
			products: {
				columns: {
					name: fake.valuesFromArray({
						values: names,
					}),
					unit: fake.default({
						defaultValue: 'Pcs',
					}),
					holding_cost: fake.default({
						defaultValue: 10,
					}),
					order_cost: fake.default({
						defaultValue: 5000,
					}),
					stock: fake.int({
						minValue: 10,
						maxValue: 100,
					}),
					price: fake.valuesFromArray({
						values: [5000, 7000, 10000, 15000, 20000],
					}),
					...timestamp,
				},
				count: count,
			},
			transactions: {
				columns: {
					product_id: fake.int({
						minValue: 1,
						maxValue: count,
					}),
					quantity: fake.int({
						minValue: 20,
						maxValue: 50,
					}),
					date: fake.date({
						minDate: new Date('2023-01-01'),
						maxDate: new Date(),
					}),
					total: fake.valuesFromArray({
						values: [5000, 7000, 10000, 15000, 20000].map((value) => value * 100),
					}),
					type: fake.valuesFromArray({
						values: ['sales', 'procurements'],
					}),
					...timestamp,
				},
				count: count * 4,
			},
		};
	});
}

main();
