import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<Header>
			<HeaderTitle>Create Product</HeaderTitle>
			<HeaderDescription>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
				dignissimos possimus corrupti a quae!
			</HeaderDescription>
		</Header>
	);
}
