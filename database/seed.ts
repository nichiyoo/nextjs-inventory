import 'dotenv/config';

import * as schema from '../database/schema';

import { eq, sql } from 'drizzle-orm';
import { reset, seed } from 'drizzle-seed';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { subMonths } from 'date-fns';

const development = {
	url: process.env.DATABASE_FILE_NAME!,
};

export default async function main() {
	const client = createClient(development);
	const db = drizzle({
		client,
	});

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

	const end = new Date();
	const start = subMonths(end, 3);

	await reset(db, schema);
	await seed(db, schema).refine((fake) => {
		const timestamp = {
			created_at: fake.date({ minDate: start, maxDate: end }),
			updated_at: fake.date({ minDate: start, maxDate: end }),
		};

		return {
			products: {
				columns: {
					name: fake.valuesFromArray({ values: names }),
					unit: fake.default({ defaultValue: 'Pcs' }),
					stock: fake.default({ defaultValue: 0 }),
					holding_cost: fake.default({ defaultValue: 10 }),
					order_cost: fake.default({ defaultValue: 5000 }),
					price: fake.valuesFromArray({ values: [5000, 7000, 10000, 15000, 20000] }),
					...timestamp,
				},
				count: count,
			},
			transactions: {
				columns: {
					product_id: fake.int({ minValue: 1, maxValue: count }),
					date: fake.date({ minDate: start, maxDate: end }),
					total: fake.valuesFromArray({ values: [5000, 7000, 10000, 15000, 20000].map((value) => value * 100) }),
					type: fake.valuesFromArray({ values: ['sales', 'procurements'] }),
					quantity: fake.default({ defaultValue: 0 }),
					...timestamp,
				},
				count: count * 4,
			},
			users: {
				columns: {
					role: fake.valuesFromArray({ values: ['user', 'admin'] }),
				},
				count: 10,
			},
		};
	});
}

main();
