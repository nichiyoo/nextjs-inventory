import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { ProductForm } from '@/components/products/form';
import { create } from '@/actions/products/action';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Create Product</HeaderTitle>
				<HeaderDescription>
					Add new products to the inventory, specifying details such as name, stock level, and price.
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<ProductForm action={create} mode='create' />
			</div>
		</div>
	);
}
