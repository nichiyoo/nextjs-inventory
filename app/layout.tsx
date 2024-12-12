import './globals.css';

import { Bricolage_Grotesque, Inter } from 'next/font/google';

import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const bricolage = Bricolage_Grotesque({
	subsets: ['latin'],
	variable: '--font-bricolage',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn('antialiased font-sans', inter.variable, bricolage.variable)}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
