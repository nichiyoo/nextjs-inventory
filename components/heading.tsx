import * as React from 'react';

import { cn } from '@/lib/utils';

const Header = React.forwardRef<HTMLDivElement, React.ComponentProps<'header'>>(({ className, ...props }, ref) => {
	return <header ref={ref} className={cn(className)} {...props} />;
});

Header.displayName = 'Header';

const HeaderTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<'h1'>>(({ className, ...props }, ref) => {
	return <h1 ref={ref} className={cn('text-5xl font-bold font-display', className)} {...props} />;
});

HeaderTitle.displayName = 'HeaderTitle';

const HeaderDescription = React.forwardRef<HTMLParagraphElement, React.ComponentProps<'p'>>(
	({ className, ...props }, ref) => {
		return <p ref={ref} className={cn('text-muted-foreground', className)} {...props} />;
	}
);

HeaderDescription.displayName = 'HeaderDescription';

export { Header, HeaderTitle, HeaderDescription };
