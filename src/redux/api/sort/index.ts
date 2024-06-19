import { api as index } from '..';
import { SORT } from './types';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postSortBook: build.mutation<SORT.PostSortResponse, SORT.PostSortRequest>({
			query: ({ newData, pagination }) => ({
				url: '/api/book/filter',
				method: 'POST',
				body: newData,
				params: {
					...pagination
				}
			}),
			invalidatesTags: ['sort']
		})
	})
});
export const { usePostSortBookMutation } = api;
