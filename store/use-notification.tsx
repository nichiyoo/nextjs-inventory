import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';
import { NotificationProps } from '@/lib/types';

interface NotificationState {
	notifications: Array<NotificationProps>;
	notify: ({ title, description, variant }: Omit<NotificationProps, 'id'>) => void;
	remove: (index: string) => void;
	purge: () => void;
}

export const useNotification = create<NotificationState>()(
	persist(
		(set) => ({
			notifications: [],
			notify: ({ title, description, variant = 'default' }) => {
				set((state) => {
					return {
						notifications: [
							{
								id: new Date().getTime().toString(),
								title,
								description,
								variant,
							},
							...state.notifications,
						],
					};
				});
			},
			remove: (id: string) => {
				set((state) => {
					return {
						notifications: state.notifications.filter((notification) => notification.id !== id),
					};
				});
			},
			purge: () => {
				set(() => {
					return {
						notifications: [],
					};
				});
			},
		}),
		{
			name: 'notification',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ notifications: state.notifications }),
		}
	)
);
