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
			providesTags: ['basket']
		}),

		DeleteClearBasket: build.mutation<
			BASKET.DeleteClearPageResponse,
			BASKET.DeleteCleatPageRequst
		>({
			query: () => ({
				url: '/api/basket/emptyTrash',
				method: 'DELETE'
			}),
			invalidatesTags: ['basket']
		}),
		DeleteBookId: build.mutation({
			query: (id: number) => ({
				url: `/api/basket/deleteBookFromBasket/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['basket']
		}),
		CountBookBasket: build.mutation({
			query: ({ bookId, addOrMinus }) => ({
				url: `/api/basket/addOrMinusBookInBasket?bookId=${bookId}&addOrMinus=${addOrMinus}`,
				method: 'PUT'
			}),
			invalidatesTags: ['basket']
		})
	})
});

export const {
	useGetCountInBasketQuery,
	useDeleteClearBasketMutation,
	useDeleteBookIdMutation,
	useCountBookBasketMutation
} = api;
