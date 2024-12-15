import * as React from 'react';

import { AlertCircle, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNotification } from '@/store/use-notification';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AppNotificationProps {
	//
}

export const AppNotification: React.FC<AppNotificationProps> = ({ ...props }) => {
	const { notifications, remove, purge } = useNotification();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className='relative'>
					<Button variant='secondary' size='icon'>
						<Bell className='size-5' />
					</Button>

					{notifications.length > 0 && (
						<div className='absolute top-0 right-0'>
							<span className='size-4 rounded-full text-xs bg-primary text-white font-medium flex items-center justify-center'>
								{notifications.length}
							</span>
						</div>
					)}
				</div>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Notifications</SheetTitle>
					<SheetDescription>View all notifications in a single place</SheetDescription>
				</SheetHeader>

				<ScrollArea className='py-10 h-screen'>
					<div className='grid gap-4'>
						{notifications.map((notification, index) => {
							const Icon = notification.variant === 'destructive' ? AlertCircle : Bell;
							return (
								<TooltipProvider key={index}>
									<Tooltip>
										<TooltipTrigger asChild>
											<div
												onClick={() => remove(notification.id)}
												className='rounded-xl border border-border bg-card p-4 relative cursor-pointer hover:bg-secondary'>
												<div className='flex gap-2 items-start'>
													<Icon
														className={cn('size-5 flex-none mt-1', {
															'text-destructive': notification.variant === 'destructive',
															'text-primary': notification.variant !== 'destructive',
														})}
													/>
													<div className='flex flex-col gap-2 text-sm'>
														<h5
															className={cn('font-medium', {
																'text-destructive':
																	notification.variant === 'destructive',
																'text-primary': notification.variant !== 'destructive',
															})}>
															{notification.title}
														</h5>
														<p className='text-muted-foreground'>
															{notification.description}
														</p>
													</div>
												</div>
											</div>
										</TooltipTrigger>

										<TooltipContent>
											<p>Remove Notification</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							);
						})}

						{notifications.length === 0 && (
							<div className='flex items-center justify-center gap-4 text-muted-foreground'>
								<Bell className='size-5' />
								<p className='text-sm font-medium'>No notifications</p>
							</div>
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};
