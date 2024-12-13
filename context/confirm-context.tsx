'use client';

import * as React from 'react';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

interface ConfirmContextProps {
	confirm: (options: ModalOption) => Promise<unknown>;
}

const ConfirmContext = React.createContext<ConfirmContextProps>({
	confirm: async () => {},
});

interface ModalOption {
	title: string;
	description: string;
	variant?: 'default' | 'destructive';
}

interface PromiseHandler {
	resolve: (value: unknown) => void;
	reject: (value: unknown) => void;
}

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
	const promise = React.useRef<PromiseHandler | null>(null);
	const [options, setOptions] = React.useState<ModalOption | null>();

	const confirm = ({ title, description, variant = 'default' }: ModalOption) => {
		setOptions({
			title,
			variant,
			description,
		});
		return new Promise((resolve, reject) => {
			promise.current = { resolve, reject };
		});
	};

	const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (promise.current) promise.current.resolve(null);
		setOptions(null);
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (promise.current) promise.current.reject(null);
		setOptions(null);
	};

	return (
		<>
			<ConfirmContext.Provider value={{ confirm }}>{children}</ConfirmContext.Provider>

			<Dialog open={!!options} onOpenChange={(open) => !open && setOptions(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{options && options.title}</DialogTitle>
						<DialogDescription>{options && options.description}</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='secondary' onClick={handleCancel}>
								Close
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button variant={options && options.variant} onClick={handleConfirm}>
								Confirm
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ConfirmContext;
