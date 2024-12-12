import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parseISO } from 'date-fns';

const LOCALE = process.env.NEXT_PUBLIC_LOCALE ?? 'id-ID';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function compactNumber(value: number, fixed = 2) {
	return new Intl.NumberFormat(LOCALE, {
		notation: 'compact',
		compactDisplay: 'short',
		maximumFractionDigits: fixed,
	}).format(value);
}

export function formatCurrency(value: number) {
	return Intl.NumberFormat(LOCALE, {
		style: 'currency',
		currency: 'IDR',
	}).format(value);
}

export function formatDate(raw: string) {
	const date = parseISO(raw);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	return date.toLocaleDateString(LOCALE, options);
}

export function formatDatetime(raw: string) {
	const date = parseISO(raw);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	return date.toLocaleDateString(LOCALE, options);
}

export const formatPercent = (value: number) => {
	return Intl.NumberFormat(LOCALE, {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
};
