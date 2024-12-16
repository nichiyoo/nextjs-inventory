import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

const production = {
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
};

const development = {
	url: process.env.DATABASE_FILE_NAME!,
};

export default defineConfig({
	out: './drizzle',
	schema: './database/schema.ts',
	dialect: process.env.NODE_ENV === 'production' ? 'turso' : 'sqlite',
	dbCredentials: process.env.NODE_ENV === 'production' ? production : development,
});
