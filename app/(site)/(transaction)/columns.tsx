'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product, Transaction } from '@/lib/types';
import { formatCurrency, formatDatetime } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { MoreHorizontal } from 'lucide-react';

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
		header: ({ column }) => {
			return <DataTableColumnHeader column={column} title='Product' />;
		},
		cell: ({ row }) => {
			return <span className='font-medium'>{row.original.product.name}</span>;
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
			return <span className='text-muted-foreground'>{formatDatetime(row.original.date)}</span>;
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
			return <Badge>{row.original.type}</Badge>;
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
