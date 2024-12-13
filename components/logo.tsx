import * as React from 'react';

import Image from 'next/image';
import LogoIcon from '@/public/icon.svg';

interface LogoProps {
	//
}

export const Logo: React.FC<LogoProps> = () => {
	return (
		<div className='flex items-center gap-2'>
			<Image src={LogoIcon} alt='Logo' width={32} height={32} className='size-10' />
			<span className='text-lg font-bold font-display'>{process.env.NEXT_PUBLIC_APP_NAME}</span>
		</div>
	);
};
