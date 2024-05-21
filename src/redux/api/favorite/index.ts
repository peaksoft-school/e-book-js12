import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllBooksInFavorite: build.query<
			FAVORITE.GetAllBooksInFavoriteResponse,
			FAVORITE.GetAllBooksInFavoriteRequest
		>({
			query: () => ({
				url: '/api/favorite/findAllInFavorite',
				method: 'GET'
			}),
			providesTags: ['favorite']
		}),

		getCountOfBooksInFavorite: build.query<
			FAVORITE.GetCountOfBooksResponse,
			FAVORITE.GetCountOfBooksRequest
		>({
			query: () => ({
				url: '/api/favorite/countOfBooksInFavorite',
				method: 'GET'
			}),
			providesTags: ['favorite']
		}),

		clearFavorite: build.mutation<
		FAVORITE.ClearFavoriteResponse,
		FAVORITE.ClearFavoriteRequest
		>({
			query: (data) => ({
				url: '/api/favorite/clearFavorites',
				method: 'DELETE',
				body: data
			}),
			invalidatesTags: ['favorite']
		}),

	})
});

export const { useGetAllBooksInFavoriteQuery, useGetCountOfBooksInFavoriteQuery, useClearFavoriteMutation } =
	api;