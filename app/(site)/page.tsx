import * as React from 'react';

import { Header, HeaderDescription, HeaderTitle } from '@/components/heading';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div>
			<Header>
				<HeaderTitle>Home</HeaderTitle>
				<HeaderDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat commodi soluta aut saepe assumenda natus
					dignissimos possimus corrupti a quae!
				</HeaderDescription>
			</Header>
		</div>
	);
}
