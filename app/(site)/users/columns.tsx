'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { MoreHorizontal } from 'lucide-react';
import { User } from '@/lib/types';

export const columns: ColumnDef<User>[] = [
	{
		id: 'id',
		header: 'ID',
		cell: ({ row }) => {
			return <span className='font-medium'>{row.original.user_id}</span>;
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Full Name' />;
		},
		cell: ({ row }) => {
			return <span className='font-medium'>{row.original.name}</span>;
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Email' />;
		},
		cell: ({ row }) => {
			return <span className='text-muted-foreground'>{row.original.email}</span>;
		},
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Role' />;
		},
		cell: ({ row }) => {
			return <Badge>{row.original.role}</Badge>;
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align='end' className='w-40'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Inventory</DropdownMenuItem>
						<DropdownMenuItem>Edit Product</DropdownMenuItem>
						<DropdownMenuItem className='text-destructive'>Delete Product</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
