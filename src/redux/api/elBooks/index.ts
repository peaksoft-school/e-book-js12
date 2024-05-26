import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getEBook: build.query<EBOOK.GetEBookResponse, EBOOK.GetEBookRequest>({
			query: () => ({
				url: '/api/book/getAllElectronicBooks',
				method: 'GET'
			}),
			providesTags: ['eBook']
		})
	})
});

export const { useGetEBookQuery } = api;
