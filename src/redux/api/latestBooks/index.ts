import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllLatestBooks: build.query<
			LATESTBOOKS.GetAllLatestBooksResponse,
			LATESTBOOKS.GetAllLatestBooksRequest
		>({
			query: () => ({
				url: '/api/book/getAllLastPublicationBooks',
				method: 'GET'
			}),
			providesTags: ['latest_books']
		})
	})
});

export const { useGetAllLatestBooksQuery } = api;
