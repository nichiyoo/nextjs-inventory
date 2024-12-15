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
import { formatCurrency, formatPercent } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatDatetime } from '@/lib/utils';
import { remove } from '@/actions/products/action';
import useConfirm from '@/hooks/use-confirm';
import { useToast } from '@/hooks/use-toast';
import { useNotification } from '@/store/use-notification';

export const columns: ColumnDef<Product>[] = [
	{
		id: 'product_id',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='ID' />;
		},
		cell: ({ row }) => {
			return <span className='font-medium'>{row.original.product_id}</span>;
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Name' />;
		},
		cell: ({ row }) => {
			const path = '/products/' + row.original.product_id;

			return (
				<Link href={path} className='font-medium'>
					{row.original.name}
				</Link>
			);
		},
	},
	{
		accessorKey: 'stock',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Stock' />;
		},
		cell: ({ row }) => {
			return <span>{row.original.stock}</span>;
		},
	},
	{
		accessorKey: 'holding_cost',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Holding Cost' />;
		},
		cell: ({ row }) => {
			return <Badge variant='outline'>{formatPercent(row.original.holding_cost / 100)}</Badge>;
		},
	},
	{
		accessorKey: 'order_cost',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Order Cost' />;
		},
		cell: ({ row }) => {
			return <span>{row.original.order_cost}</span>;
		},
	},
	{
		accessorKey: 'unit',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Unit' />;
		},
		cell: ({ row }) => {
			return <Badge>{row.original.unit}</Badge>;
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Price' />;
		},
		cell: ({ row }) => {
			return <span className='font-medium'>{formatCurrency(row.original.price)}</span>;
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
	row: Row<Product>;
}

const TableAction: React.FC<TableActionProps> = ({ row }) => {
	const view = '/products/' + row.original.product_id;
	const edit = '/products/' + row.original.product_id + '/edit';

	const { toast } = useToast();
	const { confirm } = useConfirm();
	const { notify } = useNotification();

	async function handleDelete() {
		confirm({
			title: 'Delete Product',
			description: 'Are you sure you want to delete this product? This action cannot be undone.',
			variant: 'destructive',
		})
			.then(async () => {
				await remove(row.original.product_id);

				const message = {
					title: 'Product deleted',
					description: 'Product has been deleted successfully',
				};

				toast(message);
				notify(message);
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
					<DropdownMenuItem>Edit Product</DropdownMenuItem>
				</Link>
				<DropdownMenuItem className='text-destructive' onClick={handleDelete}>
					Delete Product
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
