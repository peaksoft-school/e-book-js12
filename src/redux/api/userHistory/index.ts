import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		clientProfileHistory: build.query<
			USERHISTORY.UserHistoryResponse,
			USERHISTORY.UserHistoryRequest
		>({
			query: (clientId) => ({
				url: `/api/historyAction/getAllHistoryAction`,
				method: 'GET',
				params: { clientId }
			}),
			providesTags: ['clientProfile']
		}),
		getAllHistoryAction: build.query<
			USERALLHISTORY.UserHistoryActionResponse,
			USERALLHISTORY.UserHistoryActionRequest
		>({
			query: (id) => ({
				url: `/api/historyAction/getAllHistoryAction/${id}`,
				method: 'GET'
			}),
			providesTags: ['clientProfile']
		}),
		getAllFavorite: build.query<
			USEFAVORITE.UserAllFavoriteResponse,
			USEFAVORITE.UserAllFavoriteRequest
		>({
			query: (clientId) => ({
				url: `/api/historyAction/getAllFavorite/${clientId}`,
				method: 'GET',
				params: {
					page: 1,
					size: 10
				}
			}),
			providesTags: ['clientProfile']
		}),
		getBooksInBasket: build.query<
			USEBASKET.UseBasketBooksResponse,
			USEBASKET.UseBasketBooksRequest
		>({
			query: (clientId) => ({
				url: `/api/historyAction/getBooksInBasket/${clientId}`,
				method: 'GET'
			}),
			providesTags: ['clientProfile']
		})
	})
});

export const {
	useClientProfileHistoryQuery,
	useGetAllHistoryActionQuery,
	useGetAllFavoriteQuery,
	useGetBooksInBasketQuery
} = api;
