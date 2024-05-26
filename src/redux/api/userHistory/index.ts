import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		clientProfileHistory: build.query<
			USERHISTORY.UserHistoryResponse,
			USERHISTORY.UserHistoryRequest
		>({
			query: (id) => ({
				url: `/api/historyAction/getAllHistoryAction/${id}`,
				method: 'PUT'
			}),
			providesTags: ['clientProfile']
		})
	})
});

export const { useClientProfileHistoryQuery } = api;
