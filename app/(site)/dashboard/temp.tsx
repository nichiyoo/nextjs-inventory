'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartConfig = {
	visitors: {
		label: 'Visitors',
	},
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

interface ChartProps {
	data: Array<{
		date: string;
		mobile: number;
		desktop: number;
	}>;
}

export function Chart({ data }: ChartProps) {
	const [timeRange, setTimeRange] = React.useState('90d');

	const filteredData = data.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date('2024-06-30');
		let daysToSubtract = 90;

		if (timeRange === '30d') {
			daysToSubtract = 30;
		} else if (timeRange === '7d') {
			daysToSubtract = 7;
		}

		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card>
			<CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
				<div className='grid flex-1 gap-1 text-center sm:text-left'>
					<CardTitle>Data Penjualan Harian</CardTitle>
					<CardDescription>Menampilkan jumlah penjualan produk harian</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className='w-[160px] rounded-lg sm:ml-auto' aria-label='Select a value'>
						<SelectValue placeholder='3 Bulan Terakhir' />
					</SelectTrigger>
					<SelectContent className='rounded-xl'>
						<SelectItem value='90d' className='rounded-lg'>
							3 Bulan Terakhir
						</SelectItem>
						<SelectItem value='30d' className='rounded-lg'>
							1 Bulan Terakhir
						</SelectItem>
						<SelectItem value='7d' className='rounded-lg'>
							7 Hari Terakhir
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer config={chartConfig} className='aspect-auto h-chart w-full'>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-desktop)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-desktop)' stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='var(--color-mobile)' stopOpacity={0.8} />
								<stop offset='95%' stopColor='var(--color-mobile)' stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										});
									}}
									indicator='dot'
								/>
							}
						/>
						<Area dataKey='mobile' type='natural' fill='url(#fillMobile)' stroke='var(--color-mobile)' stackId='a' />
						<Area dataKey='desktop' type='natural' fill='url(#fillDesktop)' stroke='var(--color-desktop)' stackId='a' />
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
