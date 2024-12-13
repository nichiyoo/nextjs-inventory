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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<ProductForm action={create} mode='create' />
			</div>
		</div>
	);
}
