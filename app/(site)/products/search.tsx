'use client';

import * as React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchProps {
	//
}

export const Search: React.FC<SearchProps> = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const keyword = searchParams.get('keyword') as string;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		router.push(`/products?keyword=${formData.get('keyword')}`);
	};

	return (
		<form className='flex gap-2' onSubmit={handleSubmit}>
			<Input type='text' defaultValue={keyword} placeholder='Cari Produk' name='keyword' />
			<Button variant='secondary'>Cari Produk</Button>
		</form>
	);
};
