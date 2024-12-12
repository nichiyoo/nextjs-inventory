'use client';

import * as React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { AppNotification } from '@/components/sidebar/app-notification';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { route } from '@/lib/contant';
import { usePathname } from 'next/navigation';

interface HeaderProps {
	//
}

const getLabel = (crumb: string) => {
	for (const item of route.main) {
		for (const subItem of item.items) {
			if (subItem.url === crumb) {
				return subItem.title;
			}
		}
	}
	return '';
};

export const Header: React.FC<HeaderProps> = () => {
	const pathname = usePathname();
	const crumbs = pathname
		.split('/')
		.filter((crumb) => crumb !== '')
		.map((crumb) => '/' + crumb);

	return (
		<header className='flex items-center h-16 border-b px-4'>
			<div className='flex items-center w-full justify-between'>
				<div className='flex shrink-0 items-center gap-2'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />

					<Breadcrumb className='hidden lg:block'>
						<BreadcrumbList>
							{crumbs.map((crumb, index) => (
								<React.Fragment key={index}>
									<BreadcrumbItem>
										<BreadcrumbLink href={crumb}>{getLabel(crumb)}</BreadcrumbLink>
									</BreadcrumbItem>
									{index !== crumbs.length - 1 && <BreadcrumbSeparator className='hidden md:block' />}
								</React.Fragment>
							))}
						</BreadcrumbList>
					</Breadcrumb>
				</div>

				<div className='flex items-center gap-2'>
					<AppNotification />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
