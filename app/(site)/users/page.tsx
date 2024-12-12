import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { DefaultTable } from '@/components/data-table/default-table';
import { columns } from './columns';
import { user } from '@/lib/temp';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>User Data</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<DefaultTable columns={columns} data={user} />
		</div>
	);
}
