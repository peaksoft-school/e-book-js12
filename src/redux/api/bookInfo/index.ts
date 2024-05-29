import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		addBookToBasket: build.mutation<
			GETBOOKBYID.PutBookByIdResponse,
			GETBOOKBYID.PutBookByIdRequest
		>({
			query: (id) => ({
				url: `/api/basket/addBookToBasket?bookId=${id}`,
				method: 'PUT'
			}),
			invalidatesTags: ['book_info']
		}),
		addBookToFavorite: build.mutation<
			GETBOOKBYID.PostBookByIdResponse,
			GETBOOKBYID.PostBookByIdRequest
		>({
			query: (id) => ({
				url: `/api/favorite/favoriteUnFavorite/${id}`,
				method: 'POST'
			}),
			invalidatesTags: ['book_info']
		})
	})
});

export const { useAddBookToBasketMutation, useAddBookToFavoriteMutation } = api;
