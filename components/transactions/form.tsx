'use client';

import * as z from 'zod';

import { Calendar, DollarSign, Hash } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Product, ToastProps } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { find, forecast } from '@/actions/products/action';
import { useNotification } from '@/store/use-notification';

const schema = z.object({
	transaction_id: z.number().optional(),
	product_id: z.coerce.number(),
	quantity: z.number().int('Quantity must be an integer'),
	date: z.coerce.date({
		required_error: 'Date is required',
		invalid_type_error: "That's not a date!",
	}),
	total: z.number().positive('Total must be positive'),
	type: z.enum(['sales', 'procurements']),
});

type TransactionFormValues = z.infer<typeof schema>;

interface TransactionFormProps {
	defaultValues?: Partial<TransactionFormValues>;
	products: Product[];
	actions: (data: TransactionFormValues) => Promise<void>;
	mode: 'create' | 'edit';
}

export function TransactionForm({ defaultValues, products, actions, mode }: TransactionFormProps) {
	const router = useRouter();
	const { notify } = useNotification();
	const { toast } = useToast();

	const messages: Record<string, ToastProps> = {
		create: {
			title: 'Transaction created',
			description: 'The Transaction has been added to the database.',
		},
		edit: {
			title: 'Transaction updated',
			description: 'The Transaction has been updated in the database.',
		},
		error: {
			title: 'Error',
			description: 'Failed to submit the form. Please try again.',
			variant: 'destructive',
		},
		low: {
			title: 'Transaction Success and Product stock is low',
			description: 'Minimum reorder point for this product is reached',
			variant: 'destructive',
		},
	};

	const message = messages[mode];

	const form = useForm<TransactionFormValues>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues || {
			quantity: 1,
			date: new Date(),
			total: 0,
			type: 'sales',
		},
	});

	async function handleSubmit(data: TransactionFormValues) {
		try {
			await actions(data);

			const product = await find(data.product_id);
			if (!product) throw new Error('Product not found');

			const result = await forecast(data.product_id);

			if (product.stock < result.rop) {
				toast(messages.low);
				notify(messages.low);
			} else {
				toast(message);
				notify(message);
			}

			router.push('/sales');
		} catch (error) {
			toast(messages.error);
			console.error(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<div className='grid md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='product_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a product' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{products.map((product) => (
											<SelectItem key={product.product_id} value={product.product_id.toString()}>
												{product.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription>Choose the product for this transaction.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='quantity'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quantity</FormLabel>
								<FormControl>
									<InputWithIcon
										icon={<Hash className='size-4' />}
										type='number'
										placeholder='0'
										{...field}
										onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
									/>
								</FormControl>
								<FormDescription>The number of units in this transaction.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={`w-full pl-3 text-left font-normal ${
												!field.value && 'text-muted-foreground'
											}`}>
											{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
											<Calendar className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<CalendarComponent
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>The date of the transaction.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='total'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Total</FormLabel>
							<FormControl>
								<InputWithIcon
									icon={<DollarSign className='size-4' />}
									type='number'
									placeholder='0.00'
									{...field}
									onChange={(e) => field.onChange(parseFloat(e.target.value))}
								/>
							</FormControl>
							<FormDescription>The total value of the transaction.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select transaction type' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='sales'>Sales</SelectItem>
									<SelectItem value='procurements'>Procurements</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>The type of transaction: sales or procurement.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
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
