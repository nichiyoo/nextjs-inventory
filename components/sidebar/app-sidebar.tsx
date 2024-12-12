'use client';

import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';

import { AppFooter } from '@/components/sidebar/app-footer';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { route } from '@/lib/contant';
import { usePathname } from 'next/navigation';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Link href='/' className='justify-center flex items-center py-2'>
					<Logo />
				</Link>
			</SidebarHeader>

			<SidebarContent className='scrollbar-hidden'>
				{route.main.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel className='text-sm text-primary font-display'>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items
									.filter((item) => !item.hidden)
									.map((item) => {
										const Icon = item.icon;

										return (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton
													asChild
													isActive={pathname.includes(item.url)}
													tooltip={item.title}
													className='h-10'>
													<Link href={item.url}>
														{Icon && <Icon className='size-5' />}
														<span>{item.title}</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter>
				<AppFooter
					user={{
						name: 'Administrator',
						email: 'admin@example.com',
						avatar: 'https://i.pravatar.cc/300',
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
