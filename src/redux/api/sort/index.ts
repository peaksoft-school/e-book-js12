import { api as index } from '..';
import { SORT } from './types';

const api = index.injectEndpoints({
	endpoints: (build) => ({
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
export const { usePostSortBookMutation } = api;
