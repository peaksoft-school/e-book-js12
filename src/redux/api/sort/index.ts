import { api as index } from '..';
import { SORT } from './types';

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
				url: '/api/book/filter',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['sort']
		})
	})
});
export const { useGetSortQuery, usePostSortBookMutation } = api;
