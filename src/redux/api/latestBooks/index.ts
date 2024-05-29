import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllBooks: build.query<
			LATESTBOOKS.GetAllBooksResponse,
			LATESTBOOKS.GetAllBooksRequest
		>({
			query: () => ({
				url: '/api/book/getAllBooks',
				method: 'GET'
			}),
			providesTags: ['book']
		})
	})
});

export const { useGetAllBooksQuery } = api;
