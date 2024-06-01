import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		GetReceiptRequestedBooks: build.query<
			ALLBOOKS.GetAllBooksResponse,
			ALLBOOKS.GetAllBooksRequest
		>({
			query: () => ({
				url: '/api/book/requests/books/',
				method: 'GET'
			}),
			providesTags: ['books']
		})
	})
});
export const { useGetReceiptRequestedBooksQuery } = api;
