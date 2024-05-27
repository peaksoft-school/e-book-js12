import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		subscribe: build.mutation<
			SUBSCRIBE.SubscribeResponse,
			SUBSCRIBE.SubscribeRequest
		>({
			query: (data) => ({
				url: '/api/mailing/subscribeToOurNewsletter',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['subscribe_api']
		})
	})
});

export const { useSubscribeMutation } = api;
