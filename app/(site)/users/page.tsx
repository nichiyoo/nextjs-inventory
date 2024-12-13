import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { Button } from '@/components/ui/button';
import { DefaultTable } from '@/components/data-table/default-table';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { columns } from '@/components/users/columns';
import db from '@/lib/drizzle';
import { users } from '@/database/schema';

export const dynamic = 'force-dynamic';

export default async function Page(): Promise<React.JSX.Element> {
	const data = await db.select().from(users);

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>User Data</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>
			<DefaultTable columns={columns} data={data}>
				<div className='flex items-center gap-4'>
					<Link href='/users/create'>
						<Button>
							<PlusIcon className='size-4' />
							<span>New User</span>
						</Button>
					</Link>
				</div>
			</DefaultTable>
		</div>
	);
}
