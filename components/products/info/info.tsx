import { Badge } from '@/components/ui/badge';

interface InfoItemProps {
	label: string;
	value: React.ReactNode;
	icon?: React.ReactNode;
	badge?: boolean;
	badgeVariant?: 'default' | 'secondary' | 'destructive';
}

export function InfoItem({ label, value, icon, badge = false, badgeVariant = 'default' }: InfoItemProps) {
	return (
		<div className='flex justify-between items-center text-sm'>
			<span className='font-semibold'>{label}</span>
			{badge ? (
				<Badge variant={badgeVariant} className='flex items-center gap-2'>
					{icon}
					{value}
				</Badge>
			) : (
				<span className='flex items-center gap-2'>
					{icon}
					{value}
				</span>
			)}
		</div>
	);
}
