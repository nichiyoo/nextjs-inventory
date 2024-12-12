import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { products } from '@/lib/temp';

interface PageProps {
	params: {
		id: string;
	};
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const { id } = params;
	const product = products.find((product) => product.product_id === Number(id));

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Edit Product</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<pre>{JSON.stringify(product, null, 2)}</pre>
		</div>
	);
}
