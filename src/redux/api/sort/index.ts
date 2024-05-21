import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getSort: build.query<SORT.GetSortsResponse, SORT.GetSortsRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['sort']
		}),

		postSortBook: build.mutation<SORT.PostSortResponse, SORT.PostSortRequest>({
			query: (newData) => ({
				url: '/products/create',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['sort']
		})
	})
});
export const { useGetSortQuery, usePostSortBookMutation } = api;
