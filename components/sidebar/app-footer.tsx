'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function AppFooter({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size='lg'>
					<Avatar className='h-8 w-8 rounded-lg'>
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
					</Avatar>

					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-semibold'>{user.name}</span>
						<span className='truncate text-xs'>{user.email}</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}