import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllBestsellers: build.query<
			BESTSELLERS.GetAllBestsellersResponse,
			BESTSELLERS.GetAllBestsellersRequest
		>({
			query: () => ({
				url: '/api/book/getAllBestSellers',
				method: 'GET'
			}),
			providesTags: ['bestsellers']
		})
	})
});

export const { useGetAllBestsellersQuery } = api;