import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getBookById: build.query<
			GETBOOKBYID.GetBookByIdResponse,
			GETBOOKBYID.GetBookByIdRequest
		>({
			query: (id) => (
				console.log(id),
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
				url: `/api/basket/addBookToBasket/${id}`,
				method: 'PUT'
				// body: addToBasketBook
			}),
			invalidatesTags: ['audio_book']
		})
	})
});

export const { useGetBookByIdQuery, useAddBookToBasketMutation } = api;
