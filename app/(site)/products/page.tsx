import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

import { Button } from '@/components/ui/button';
import { DefaultTable } from '@/components/data-table/default-table';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Search } from './search';
import { columns } from './columns';
import db from '@/lib/drizzle';

// import { products } from '@/lib/temp';

interface PageProps {
	searchParams: {
		keyword: string;
	};
}

export default async function Page({ searchParams }: PageProps): Promise<React.JSX.Element> {
	const keyword = searchParams.keyword as string;
	const data = await db.query.products.findMany();

	const filtered = keyword
		? data.filter((item) => {
				const name = item.name.toLowerCase();
				const search = keyword.toLowerCase();
				return name.includes(search);
		  })
		: data;

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Product Data</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>

			<DefaultTable columns={columns} data={filtered}>
				<div className='flex items-center gap-4'>
					<Search />

					<Link href='/products/create'>
						<Button>
							<PlusIcon className='size-4' />
							<span>Tambah Produk</span>
						</Button>
					</Link>
				</div>
			</DefaultTable>
		</div>
	);
}