import { PieChartIcon as ChartPie, Package2, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, Transaction } from '@/lib/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

import { InfoItem } from './info/info';
import { Separator } from '@/components/ui/separator';

interface ProductInfoListProps {
	product: Product & {
		transactions: Transaction[];
	};
	calculation: {
		forecast: number;
		average: number;
		eoq: number;
		rop: number;
	};
}

export default function ProductDetail({ product, calculation }: ProductInfoListProps) {
	const totalSales = product.transactions.filter((t) => t.type === 'sales').reduce((sum, t) => sum + t.quantity, 0);
	const totalProcurements = product.transactions
		.filter((t) => t.type === 'procurements')
		.reduce((sum, t) => sum + t.quantity, 0);
	const turnoverRate = totalSales / (product.stock + totalProcurements);

	return (
		<div className='grid gap-8 md:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<Package2 className='size-5' />
						Product Details
					</CardTitle>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<InfoItem label='ID' value={product.product_id} />
					<InfoItem label='Name' value={product.name} />
					<Separator />
					<InfoItem label='Unit' value={product.unit} />
					<InfoItem label='Price' value={formatCurrency(product.price)} />
					<InfoItem label='Stock' value={`${product.stock} ${product.unit}`} badge />
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
					<InfoItem
						label='Holding Cost'
						value={formatPercent(product.holding_cost / 100)}
						badgeVariant='secondary'
						badge
					/>
					<InfoItem label='Order Cost' value={formatCurrency(product.order_cost)} />
					<Separator />
					<InfoItem
						label='Total Sales'
						value={totalSales + ' ' + product.unit}
						icon={<ShoppingCart className='size-4' />}
					/>
					<InfoItem
						label='Total Procurements'
						value={totalProcurements + ' ' + product.unit}
						icon={<Package2 className='size-4' />}
					/>
					<InfoItem label='Turnover Rate' value={turnoverRate.toFixed(2)} badge badgeVariant='destructive' />
				</CardContent>
			</Card>

			<Card className='md:col-span-2'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-xl'>
						<ChartPie className='size-5' />
						Analysis
					</CardTitle>
				</CardHeader>
				<CardContent className='grid gap-8 sm:grid-cols-2'>
					<InfoItem
						label='Next Month Sales Forecast'
						value={calculation.forecast.toFixed(2)}
						icon={<ShoppingCart className='size-4' />}
					/>
					<InfoItem
						label='Average Monthly Sales'
						value={calculation.average.toFixed(2)}
						icon={<ShoppingCart className='size-4' />}
					/>
					<InfoItem
						label='Economic Order Quantity (EOQ)'
						value={calculation.eoq.toFixed(2)}
						icon={<ShoppingCart className='size-4' />}
						badge
					/>
					<InfoItem
						label='Reorder Point (ROP)'
						value={calculation.rop.toFixed(2)}
						icon={<ShoppingCart className='size-4' />}
						badge
					/>
				</CardContent>
			</Card>
		</div>
	);
}
