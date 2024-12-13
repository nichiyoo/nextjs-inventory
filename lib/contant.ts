import { Box, ChartColumnBig, ShoppingCart, Store, TrendingUpDown, User2, Warehouse } from 'lucide-react';

export const route = {
	main: [
		{
			title: 'Main Menu',
			items: [
				{ url: '/dashboard', title: 'Dashboard', icon: ChartColumnBig },
				{ url: '/products', title: 'Products Data', icon: Box },
				{ url: '/products/create', icon: Box, title: 'Create Product', hidden: true },
				{ url: '/products/*', icon: Box, title: 'Products Detail', hidden: true },
				{ url: '/sales', title: 'Sales Data', icon: ShoppingCart },
				{ url: '/procurements', title: 'Procurements Data', icon: Store },
			],
		},
		{
			title: 'Forecasting',
			items: [{ url: '/forecasting', title: 'Product Forecasting', icon: TrendingUpDown }],
		},
		{
			title: 'Administration',
			items: [
				{ url: '/users', title: 'User Management', icon: User2 },
				{ url: '/auth/signin', title: 'User Sign In', icon: User2 },
				{ url: '/auth/signup', title: 'User Sign Up', icon: User2 },
			],
		},
	],
};

export const types = {
	sales: 'sales',
	procurements: 'procurements',
} as const;
