import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		addBookVendor: build.mutation({
			query: ({ newUpDateBook, genre, language, bookType }) => ({
				url: `/api/book/saveBook`,
				method: 'POST',
				body: newUpDateBook,
				params: {
					genre,
					language,
					bookType
				}
			}),
			invalidatesTags: ['add_book']
		})
	})
});

export const { useAddBookVendorMutation } = api;
