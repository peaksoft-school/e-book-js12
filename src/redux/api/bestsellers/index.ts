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
			providesTags: ['book']
		}),
		getEBook: build.query<EBOOK.GetEBookResponse, EBOOK.GetEBookRequest>({
			query: () => ({
				url: '/api/book/getAllElectronicBooks',
				method: 'GET'
			}),
			providesTags: ['book']
		})
	})
});

export const { useGetAllBestsellersQuery, useGetEBookQuery } = api;
