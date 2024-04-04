import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getProductsBasket: build.query<
			BASKET.GetProductsResponse,
			BASKET.GetProductsRequest
		>({
			query: () => ({
				url: '/products/basket',
				method: 'GET'
			}),
			providesTags: ['basket']
		}),

		addProductBasket: build.mutation<
			BASKET.PostProductResponse,
			BASKET.PostProductRequest
		>({
			query: (id) => ({
				url: `/products/basket/${id}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['basket']
		})
	})
});
export const { useGetProductsBasketQuery, useAddProductBasketMutation } = api;
