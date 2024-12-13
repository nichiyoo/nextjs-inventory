'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { format } from 'date-fns';

const chartConfig = {
	actual: {
		label: 'Actual',
		color: 'hsl(var(--chart-1))',
	},
	predicted: {
		label: 'predicted',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

interface ChartProps {
	title: string;
	description: string;
	data: Array<{
		date: Date;
		actual: number;
		predicted: number;
	}>;
}

export function Chart({ title, description, data }: ChartProps) {
	const chartData = data.map((item) => ({
		date: format(item.date, 'MMM'),
		actual: item.actual,
		predicted: item.predicted,
	}));

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='w-full h-96'>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
						<Bar dataKey='actual' fill='var(--color-actual)' radius={4} />
						<Bar dataKey='predicted' fill='var(--color-predicted)' radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
