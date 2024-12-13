import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { intlFormatDistance, parseISO } from 'date-fns';

const LOCALE = process.env.NEXT_PUBLIC_LOCALE ?? 'en-US';

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

export function parse(raw: string | Date) {
	return typeof raw === 'string' ? parseISO(raw) : raw;
}

export function formatDate(raw: string | Date) {
	const date = parse(raw);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	return date.toLocaleDateString(LOCALE, options);
}

export function formatDatetime(raw: string | Date) {
	const date = parse(raw);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	return date.toLocaleDateString(LOCALE, options);
}

export function formatRelativeTime(raw: string | Date) {
	const today = new Date();
	const date = parse(raw);

	return intlFormatDistance(date, today, {
		style: 'short',
		unit: 'day',
	});
}

export const formatPercent = (value: number) => {
	return Intl.NumberFormat(LOCALE, {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
};
