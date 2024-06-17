import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		AddBookVendor: build.mutation<
			ADDBOOKVENDOR.AddBookVendorResponse,
			ADDBOOKVENDOR.AddBookVendorRequest
		>({
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
		}),
		EditBook: build.mutation({
			query: ({ bookId, newUpDateBook, genre, language, bookType }) => ({
				url: '/api/book/updateBook',
				method: 'PUT',
				body: newUpDateBook,
				params: {
					bookId,
					genre,
					language,
					bookType
				}
			}),
			invalidatesTags: ['add_book']
		}),
		PostFile: build.mutation<
			ADDBOOKVENDOR.PostFileResponse,
			ADDBOOKVENDOR.PostFileRequest
		>({
			query: (file) => {
				const formData = new FormData();
				formData.append('file', file);
				return {
					url: '/file',
					method: 'POST',
					body: formData
				};
			},
			invalidatesTags: ['add_book']
		})
	})
});

export const {
	useAddBookVendorMutation,
	usePostFileMutation,
	useEditBookMutation
} = api;
