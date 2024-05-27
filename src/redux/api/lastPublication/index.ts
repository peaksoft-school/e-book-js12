import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getLastPublication: build.query<
			LASTPUBLICATION.GetLastPublicationResponse,
			LASTPUBLICATION.GetLastPublicationRequest
		>({
			query: () => ({
				url: '/api/book/getAllLastPublicationBooks',
				method: 'GET'
			}),
			providesTags: ['last_publication']
		})
	})
});

export const { useGetLastPublicationQuery } = api;
