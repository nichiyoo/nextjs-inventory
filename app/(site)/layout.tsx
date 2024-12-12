import * as React from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Header } from '@/components/sidebar/app-header';

export default async function Layout({ children }: React.PropsWithChildren): Promise<React.JSX.Element> {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className='container max-w-7xl py-8'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
