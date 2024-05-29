import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		clientProfileHistory: build.query<USERHISTORY.UserHistoryResponse, number>({
			query: (clientId) => ({
				url: `/api/historyAction/getAllHistoryAction`,
				method: 'GET',
				params: { clientId }
			}),
			providesTags: ['clientProfile']
		})
	})
});

export const { useClientProfileHistoryQuery } = api;
