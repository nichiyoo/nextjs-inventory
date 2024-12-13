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
import { Product, Transaction } from '@/lib/types';
import { cn, formatCurrency, formatDatetime, formatRelativeTime } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { remove } from '@/actions/transactions/action';
import useConfirm from '@/hooks/use-confirm';
import { useToast } from '@/hooks/use-toast';

export const columns: ColumnDef<Transaction & { product: Product }>[] = [
	{
		id: 'id',
		header: 'ID',
		cell: ({ row }) => {
			return <span className='font-medium'>{row.original.transaction_id}</span>;
		},
	},
	{
		accessorKey: 'product',
		header: 'Product',
		cell: ({ row }) => {
			const path = '/products/' + row.original.product_id;
			return (
				<Link href={path} className='font-medium'>
					{row.original.product?.name}
				</Link>
			);
		},
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Quantity' />;
		},
		cell: ({ row }) => {
			return <span>{row.original.quantity}</span>;
		},
	},
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Date' />;
		},
		cell: ({ row }) => {
			return <span className='text-muted-foreground'>{formatRelativeTime(row.original.date)}</span>;
		},
	},
	{
		accessorKey: 'total',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Total' />;
		},
		cell: ({ row }) => {
			return <span className='font-medium'>{formatCurrency(row.original.total)}</span>;
		},
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Transction Type' />;
		},
		cell: ({ row }) => {
			return (
				<Badge
					className={cn({
						'bg-red-500 hover:bg-red-600': row.original.type === 'procurements',
						'bg-green-500 hover:bg-green-600': row.original.type === 'sales',
					})}>
					{row.original.type}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Created At' />;
		},
		cell: ({ row }) => {
			return <span className='text-muted-foreground'>{formatDatetime(row.original.created_at)}</span>;
		},
	},
	{
		accessorKey: 'updated_at',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Updated At' />;
		},
		cell: ({ row }) => {
			return <span className='text-muted-foreground'>{formatDatetime(row.original.updated_at)}</span>;
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			return <TableAction row={row} />;
		},
	},
];

interface TableActionProps {
	row: Row<Transaction>;
}

const TableAction: React.FC<TableActionProps> = ({ row }) => {
	const view = '/products/' + row.original.product_id;
	const edit = '/transactions/' + row.original.transaction_id + '/edit';

	const { toast } = useToast();
	const { confirm } = useConfirm();

	async function handleDelete() {
		confirm({
			title: 'Delete Transaction',
			description: 'Are you sure you want to delete this transaction? This action cannot be undone.',
			variant: 'destructive',
		})
			.then(async () => {
				await remove(row.original.transaction_id);
				toast({
					title: 'Transaction deleted',
					description: 'Transaction has been deleted successfully',
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
					<DropdownMenuItem>View Product</DropdownMenuItem>
				</Link>

				<Link href={edit}>
					<DropdownMenuItem>Edit Transaction</DropdownMenuItem>
				</Link>

				<DropdownMenuItem className='text-destructive' onClick={handleDelete}>
					Delete Transaction
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
