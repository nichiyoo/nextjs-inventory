import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { products } from '@/database/schema';

interface PageProps {
	params: {
		id: string;
	};
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
	const { id } = params;
	const data = await db.query.products.findFirst({
		where: eq(products.product_id, Number(id)),
	});

	if (!data) notFound();

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Product Detail</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
