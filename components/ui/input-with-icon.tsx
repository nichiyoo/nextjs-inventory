import { Input } from '@/components/ui/input';
import React from 'react';
import { cn } from '@/lib/utils';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon: React.ReactNode;
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
	({ className, icon, ...props }, ref) => {
		return (
			<div className='relative'>
				<div className='absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground'>{icon}</div>
				<Input ref={ref} className={cn('pl-10', className)} {...props} />
			</div>
		);
	}
);

InputWithIcon.displayName = 'InputWithIcon';
