import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<GetMeResponse, GetMeRequest>({
			query: () => ({
				url: '/auth/user',
				method: 'GET'
			}),
			providesTags: ['me']
		})
	})
});
export const { useGetMeQuery } = api;
