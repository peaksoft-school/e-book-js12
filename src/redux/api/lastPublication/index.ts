import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getLastPublication: build.query<
			LASTPUBLICATION.GetLastPublicationResponse,
			LASTPUBLICATION.GetLastPublicationRequest
		>({
			query: ({ page, size, genre }) => ({
				url: '/api/book/getAllLastPublicationBooks',
				method: 'GET',
				params: {
					page,
					size,
					genre
				}
			}),
			providesTags: ['book']
		})
	})
});

export const { useGetLastPublicationQuery } = api;
