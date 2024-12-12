import * as React from 'react';

import { Bell } from 'lucide-react';
import { Button } from '../ui/button';

interface AppNotificationProps {
	//
}

export const AppNotification: React.FC<AppNotificationProps> = ({ ...props }) => {
	return (
		<div className='relative'>
			<Button variant='secondary' size='icon'>
				<Bell className='size-5' />
			</Button>
			<div className='absolute top-0 right-0'>
				<span className='size-4 rounded-full text-xs bg-primary text-white font-medium flex items-center justify-center'>
					2
				</span>
			</div>
		</div>
	);
};
