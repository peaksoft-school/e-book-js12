import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getBookById: build.query<
			GETBOOKBYID.GetBookByIdResponse,
			GETBOOKBYID.GetBookByIdRequest
		>({
			query: (id) => (
				console.log(id, 'idinner'),
				{
					url: `/api/book/${id}`,
					method: 'GET'
				}
			),
			providesTags: ['book_info']
		}),
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

export const {
	useGetBookByIdQuery,
	useAddBookToBasketMutation,
	useAddBookToFavoriteMutation
} = api;
