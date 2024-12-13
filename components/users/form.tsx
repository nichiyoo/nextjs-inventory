'use client';

import * as z from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { ToastProps } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
	user_id: z.number().optional(),
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	role: z.enum(['user', 'admin']),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
	defaultValues?: Partial<UserFormValues>;
	action: (data: UserFormValues) => Promise<void>;
	mode: 'create' | 'edit';
}

export function UserForm({ defaultValues, action, mode }: UserFormProps) {
	const router = useRouter();
	const { toast } = useToast();

	const messages: Record<string, ToastProps> = {
		create: {
			title: 'User created',
			description: 'User has been added to the database.',
		},
		edit: {
			title: 'User updated',
			description: 'User has been updated in the database.',
		},
		error: {
			title: 'Error',
			description: 'Failed to submit the form. Please try again.',
			variant: 'destructive',
		},
	};

	const message = messages[mode];
	const form = useForm<UserFormValues>({
		resolver: zodResolver(userSchema),
		defaultValues: defaultValues || {
			name: '',
			email: '',
			role: 'user',
		},
	});

	async function handleSubmit(data: UserFormValues) {
		try {
			await action(data);
			toast(message);
			router.push('/users');
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
								<FormLabel>Name</FormLabel>
								<FormControl>
									<InputWithIcon icon={<User className='size-4' />} placeholder="Enter user's name" {...field} />
								</FormControl>
								<FormDescription>The full name of the user.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<InputWithIcon
										icon={<Mail className='size-4' />}
										type='email'
										placeholder='user@example.com'
										{...field}
									/>
								</FormControl>
								<FormDescription>The user&apos;s email address for login and communication.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select user role' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='user'>User</SelectItem>
									<SelectItem value='admin'>Admin</SelectItem>
								</SelectContent>
							</Select>
							<FormDescription>The user&apos;s role determines their permissions in the system.</FormDescription>
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
