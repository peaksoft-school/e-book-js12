import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		addBookVendor: build.mutation({
			query: ({ formData, genre, language, bookType }) => ({
				url: `/api/book/saveBook`,
				method: 'POST',
				body: formData,
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
