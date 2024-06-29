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
		TotalCost: build.query<BASKET.TotalCostResponse, BASKET.TotalCostRequest>({
			query: () => ({
				url: '/api/basket/totalCost',
				method: 'GET'
			}),
			providesTags: ['basket']
		}),
		addBookToBasket: build.mutation<
			BASKET.AddBookToBasketResponse,
			BASKET.AddBookToBasketRequest
		>({
			query: (id) => ({
				url: `/api/basket/addBookToBasket?bookId=${id}`,
				method: 'POST'
			}),
			invalidatesTags: ['basket']
		}),

		DeleteClearBasket: build.mutation<
			BASKET.DeleteClearPageResponse,
			BASKET.DeleteClearPageRequst
		>({
			query: () => ({
				url: '/api/basket/emptyTrash',
				method: 'DELETE'
			}),
			invalidatesTags: ['basket']
		}),

		DeleteBasketBookId: build.mutation<
			BASKET.DeleteBookIdResponse,
			BASKET.DeleteBookIdRequst
		>({
			query: (id: number) => ({
				url: `/api/basket/deleteBookFromBasket/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['basket']
		}),

		CountBookBasket: build.mutation<
			BASKET.CountBookBasketResponse,
			BASKET.CountBookBasketRequest
		>({
			query: ({ bookId, addOrMinus }) => ({
				url: `/api/basket/addOrMinusBookInBasket?bookId=${bookId}&addOrMinus=${addOrMinus}`,
				method: 'PUT'
			}),
			invalidatesTags: ['basket']
		}),
		ActivedBookPromocode: build.mutation<
			BASKET.ActivedPromoResponse,
			BASKET.ActivePromoRequest
		>({
			query: ({ promoCode, id }) => ({
				url: `/api/basket/totalCostPromoCode/${id}?promoCodeString=${promoCode}`,
				method: 'POST'
			})
		})
	})
});

export const {
	useAddBookToBasketMutation,
	useGetCountInBasketQuery,
	useDeleteClearBasketMutation,
	useCountBookBasketMutation,
	useDeleteBasketBookIdMutation,
	useTotalCostQuery,
	useActivedBookPromocodeMutation
} = api;
