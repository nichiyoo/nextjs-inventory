import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { UserForm } from '@/components/users/form';
import { create } from '@/actions/users/actions';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Create User</HeaderTitle>
				<HeaderDescription>
					Register new users with roles and access levels for system operations.
				</HeaderDescription>
			</Header>

			<div className='border border-border p-8 rounded-xl bg-card'>
				<UserForm action={create} mode='create' />
			</div>
		</div>
	);
}
