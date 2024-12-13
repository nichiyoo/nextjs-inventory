import { ArrowUpDown, Calendar, Clock, DollarSign, Package2, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, Transaction } from '@/lib/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProductInfoListProps {
	product: Product & {
		transactions: Transaction[];
	};
}

export default function ProductDetail({ product }: ProductInfoListProps) {
	const totalSales = product.transactions.filter((t) => t.type === 'sales').reduce((sum, t) => sum + t.quantity, 0);
	const totalProcurements = product.transactions
		.filter((t) => t.type === 'procurements')
		.reduce((sum, t) => sum + t.quantity, 0);
	const turnoverRate = totalSales / (product.stock + totalProcurements);

	return (
		<div className='grid gap-4 md:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Package2 className='size-5' />
						Product Details
					</CardTitle>
				</CardHeader>

				<CardContent className='grid gap-4'>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>ID</span>
						<span>{product.product_id}</span>
					</div>

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Name</span>
						<span>{product.name}</span>
					</div>
					<Separator />

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Unit</span>
						<span>{product.unit}</span>
					</div>

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Price</span>
						<span>{formatCurrency(product.price)}</span>
					</div>

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Stock</span>
						<Badge>
							{product.stock} {product.unit}
						</Badge>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<TrendingUp className='size-5' />
						Financial Metrics
					</CardTitle>
				</CardHeader>

				<CardContent className='grid gap-4'>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Holding Cost</span>
						<Badge variant='secondary'>{formatPercent(product.holding_cost / 100)}</Badge>
					</div>

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Order Cost</span>
						<span>{formatCurrency(product.order_cost)}</span>
					</div>

					<Separator />

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Total Sales</span>
						<span className='flex items-center gap-2'>
							<ShoppingCart className='size-4' />
							{totalSales} {product.unit}
						</span>
					</div>

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Total Procurements</span>
						<span className='flex items-center gap-2'>
							<Package2 className='size-4' />
							{totalProcurements} {product.unit}
						</span>
					</div>

					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Turnover Rate</span>
						<Badge className='bg-red-500 hover:bg-red-600'>{turnoverRate.toFixed(2)}</Badge>
					</div>
				</CardContent>
			</Card>

			<Card className='md:col-span-2'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Clock className='size-5' />
						Time Information
					</CardTitle>
				</CardHeader>

				<CardContent className='grid gap-4 sm:grid-cols-2'>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Created At</span>
						<span className='flex items-center gap-2'>
							<Calendar className='size-4' />
							{new Date(product.created_at).toLocaleDateString()}
						</span>
					</div>
					<div className='flex justify-between items-center text-sm'>
						<span className='font-semibold'>Updated At</span>
						<span className='flex items-center gap-2'>
							<ArrowUpDown className='size-4' />
							{new Date(product.updated_at).toLocaleDateString()}
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
