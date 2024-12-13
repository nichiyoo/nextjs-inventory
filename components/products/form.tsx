'use client';

import * as z from 'zod';

import { BarChart, DollarSign, Package, Ruler, ShoppingCart, Warehouse } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { ToastProps } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

const productSchema = z.object({
	product_id: z.number().optional(),
	name: z.string().min(1, 'Name is required'),
	unit: z.string().min(1, 'Unit is required'),
	price: z.number().positive('Price must be positive'),
	stock: z.number().int('Stock must be an integer').nonnegative('Stock must be non-negative'),
	holding_cost: z.number().nonnegative('Holding cost must be non-negative'),
	order_cost: z.number().nonnegative('Order cost must be non-negative'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
	defaultValues?: Partial<ProductFormValues>;
	action: (data: ProductFormValues) => Promise<void>;
	mode: 'create' | 'edit';
}

export function ProductForm({ defaultValues, action, mode }: ProductFormProps) {
	const router = useRouter();
	const { toast } = useToast();

	const messages: Record<string, ToastProps> = {
		create: {
			title: 'Product created',
			description: 'The Product has been added to the database.',
		},
		edit: {
			title: 'Product updated',
			description: 'The Product has been updated in the database.',
		},
		error: {
			title: 'Error',
			description: 'Failed to submit the form. Please try again.',
			variant: 'destructive',
		},
	};

	const message = messages[mode];

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: defaultValues || {
			name: '',
			unit: '',
			price: 0,
			stock: 0,
			holding_cost: 0,
			order_cost: 0,
		},
	});

	async function handleSubmit(data: ProductFormValues) {
		try {
			await action(data);
			toast(message);
			router.push('/products');
		} catch (error) {
			toast(messages.error);
			console.error(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Name</FormLabel>
								<FormControl>
									<InputWithIcon icon={<Package className='size-4' />} placeholder='Enter product name' {...field} />
								</FormControl>
								<FormDescription>The name of the product as it will appear in the inventory.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='unit'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Unit</FormLabel>
								<FormControl>
									<InputWithIcon icon={<Ruler className='size-4' />} placeholder='e.g., kg, liter, piece' {...field} />
								</FormControl>
								<FormDescription>The unit of measurement for this product.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<InputWithIcon
										icon={<DollarSign className='size-4' />}
										type='number'
										placeholder='0.00'
										{...field}
										onChange={(e) => field.onChange(parseFloat(e.target.value))}
									/>
								</FormControl>
								<FormDescription>The selling price per unit of the product.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='stock'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current Stock</FormLabel>
								<FormControl>
									<InputWithIcon
										icon={<BarChart className='size-4' />}
										type='number'
										placeholder='0'
										{...field}
										onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
									/>
								</FormControl>
								<FormDescription>The current quantity of this product in stock.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='holding_cost'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Holding Cost</FormLabel>
								<FormControl>
									<InputWithIcon
										icon={<Warehouse className='size-4' />}
										type='number'
										placeholder='0.00'
										{...field}
										onChange={(e) => field.onChange(parseFloat(e.target.value))}
									/>
								</FormControl>
								<FormDescription>The cost to hold one unit of this product in inventory.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='order_cost'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Order Cost</FormLabel>
								<FormControl>
									<InputWithIcon
										icon={<ShoppingCart className='size-4' />}
										type='number'
										placeholder='0.00'
										{...field}
										onChange={(e) => field.onChange(parseFloat(e.target.value))}
									/>
								</FormControl>
								<FormDescription>The cost to place an order for this product.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex justify-end space-x-4'>
					<Button type='button' variant='outline' onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type='submit'>Submit</Button>
				</div>
			</form>
		</Form>
	);
}
