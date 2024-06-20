import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getNotification: build.query<
			NOTIFICATION.GetNotificationResponse,
			NOTIFICATION.GetNotificationRequest
		>({
			query: () => ({
				url: `/api/basket/getAll`,
				method: 'GET'
			}),
			providesTags: ['notification']
		}),
		deleteNotification: build.mutation<
			NOTIFICATION.DeleteNotificationResponse,
			NOTIFICATION.DeleteNotificationRequest
		>({
			query: ({ notificationId }) => ({
				url: `/api/basket/delete?notifyId=${notificationId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['notification']
		})
	})
});

export const { useGetNotificationQuery, useDeleteNotificationMutation } = api;
