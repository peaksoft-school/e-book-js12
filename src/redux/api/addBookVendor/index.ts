import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		addBookVendor: build.mutation<
			ADDBOOKVENDOR.AddBookVendorResponse,
			ADDBOOKVENDOR.AddBookVendorRequest
		>({
			query: (newBook) => ({
				url: `/api/book/saveBook`,
				method: 'POST',
				body: newBook
			}),
			invalidatesTags: ['add_book']
		})
	})
});

export const { useAddBookVendorMutation } = api;
