import 'dotenv/config';

import * as schema from '@/database/schema';

import { drizzle } from 'drizzle-orm/libsql';

const production = {
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
};

const development = {
	url: process.env.DATABASE_FILE_NAME!,
};

const db = drizzle({
	schema,
	connection: process.env.NODE_ENV === 'production' ? production : development,
});

export default db;
