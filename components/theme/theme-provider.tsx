'use client';

import * as React from 'react';

import { ConfirmProvider } from '@/context/confirm-context';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<NextThemesProvider {...props}>
			<ConfirmProvider>{children}</ConfirmProvider>
		</NextThemesProvider>
	);
}
