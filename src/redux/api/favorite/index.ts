import { api as index } from '..';

// const favData =
// 	'https://api.elchocrud.pro/api/v1/4c786684007b4979907332488eb72a39/favorites';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getProductsFavorite: build.query(
			// FAVORITE.GetProductsResponse,
			// FAVORITE.GetProductsRequest
			{
				query: () => ({
					url: '',
					method: 'GET'
				}),
				providesTags: ['favorite']
			}
		),

		addProductFavorite: build.mutation<
			FAVORITE.PatchProductResponse,
			FAVORITE.PatchProductRequest
		>({
			query: (id) => ({
				url: `https://api.elchocrud.pro/api/v1/4c786684007b4979907332488eb72a39/favorites/${id}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['favorite']
		})
	})
});
export const { useGetProductsFavoriteQuery, useAddProductFavoriteMutation } =
	api;
