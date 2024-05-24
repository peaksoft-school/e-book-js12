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

		deleteFavoriteBook: build.mutation<
			FAVORITE.DeleteFavoriteBookResponse,
			FAVORITE.DeleteFavoriteBookRequest
		>({
			query: (id) => ({
				url: `/api/favorite/favoriteUnFavorite/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ['favorite']
		}),

		addBookToBasket: build.mutation<
			FAVORITE.AddBookToBasketResponse,
			FAVORITE.AddBookToBasketRequest
		>({
			query: (id) => ({
				url: `/api/basket/addBookToBasket?bookId=${id}`,
				method: 'PUT'
			}),
			invalidatesTags: ['favorite']
		})
	})
});

export const {
	useGetAllBooksInFavoriteQuery,
	useGetCountOfBooksInFavoriteQuery,
	useClearFavoriteMutation,
	useDeleteFavoriteBookMutation,
	useAddBookToBasketMutation
} = api;
