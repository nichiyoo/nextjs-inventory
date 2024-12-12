'use client';

import * as React from 'react';

import { usePathname } from 'next/navigation';

interface useBreadcrumpProps {
	//
}

export const useBreadcrump: React.FC<useBreadcrumpProps> = () => {
	const pathname = usePathname();
	return pathname.split('/');
};
