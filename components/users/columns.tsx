'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
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
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { User } from '@/lib/types';
import { remove } from '@/actions/users/actions';
import useConfirm from '@/hooks/use-confirm';
import { useToast } from '@/hooks/use-toast';

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
interface TableActionProps {
	row: Row<User>;
}

const TableAction: React.FC<TableActionProps> = ({ row }) => {
	const view = '/users/' + row.original.user_id;
	const edit = '/users/' + row.original.user_id + '/edit';

	const { toast } = useToast();
	const { confirm } = useConfirm();

	async function handleDelete() {
		confirm({
			title: 'Delete User',
			description: 'Are you sure you want to delete this user? This action cannot be undone.',
			variant: 'destructive',
		})
			.then(async () => {
				await remove(row.original.user_id);
				toast({
					title: 'Product deleted',
					description: 'Product has been deleted successfully',
				});
			})
			.catch(() => {
				console.log('Cancelled');
			});
	}

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
				<Link href={view}>
					<DropdownMenuItem>View User</DropdownMenuItem>
				</Link>

				<Link href={edit}>
					<DropdownMenuItem>Edit User</DropdownMenuItem>
				</Link>
				<DropdownMenuItem className='text-destructive' onClick={handleDelete}>
					Delete User
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
