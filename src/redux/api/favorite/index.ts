import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getProductsFavorite: build.query<
			FAVORITE.GetProductsResponse,
			FAVORITE.GetProductsRequest
		>({
			query: () => ({
				url: '/products/basket',
				method: 'GET'
			}),
			providesTags: ['favorite']
		}),

		addProductFavorite: build.mutation<
			FAVORITE.PatchProductResponse,
			FAVORITE.PatchProductRequest
		>({
			query: (id) => ({
				url: `/products/favorite/${id}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['favorite']
		})
	})
});
export const { useGetProductsFavoriteQuery, useAddProductFavoriteMutation } =
	api;
