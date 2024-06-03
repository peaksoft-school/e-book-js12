import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		GetCountInBasket: build.query<
			BASKET.GetProductsResponse,
			BASKET.GetProductsRequest
		>({
			query: () => ({
				url: '/api/basket/books',
				method: 'GET'
			}),
      providesTags:['basket']
		})
	})
});

export const { useGetCountInBasketQuery } = api;
