import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		searchBooks: build.query<SEARCH.SearchResponse, SEARCH.SearchRequest>({
			query: ({ searchTerm }) => ({
				url: `/api/book/search?keyword=${searchTerm}`,
				method: 'GET'
			}),
			providesTags: ['book_search']
		})
	})
});

export const { useSearchBooksQuery } = api;
