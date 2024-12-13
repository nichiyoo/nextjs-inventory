import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { ProductForm } from '@/components/products/form';
import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { products } from '@/database/schema';
import { update } from '@/actions/products/action';

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function Page(props: PageProps): Promise<React.JSX.Element> {
	const params = await props.params;
	const { id } = params;

	const data = await db.query.products.findFirst({
		where: eq(products.product_id, Number(id)),
	});

	if (!data) notFound();

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Edit Product</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<ProductForm action={update} mode='edit' defaultValues={data} />
			</div>
		</div>
	);
}
