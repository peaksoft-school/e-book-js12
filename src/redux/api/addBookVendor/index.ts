import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		addBookVendor: build.mutation({
			query: ({ newBook, genre, language, bookType }) => ({
				url: `/api/book/saveBook`,
				method: 'POST',
				body: newBook,
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
