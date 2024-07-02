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
			invalidatesTags: ['book']
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
		}),
		EditPhotoUrl: build.mutation<
			ADDBOOKVENDOR.UpdatePhotoResponse,
			ADDBOOKVENDOR.UpdatePhotoRequest
		>({
			query: ({ newData, bookId }) => {
				return {
					url: `/api/book/updatePhoto?bookId=${bookId}`,
					method: 'PATCH',
					body: newData
				};
			},
			invalidatesTags: ['add_book']
		}),
		UpDateAudioFile: build.mutation({
			query: ({ newData, bookId }) => (
				console.log(newData),
				{
					url: `/api/book/updateAudFull?bookId=${bookId}`,
					method: 'PATCH',
					body: newData
				}
			),
			invalidatesTags: ['add_book']
		}),
		UpDateFragmentAudioFile: build.mutation({
			query: ({ newData, bookId }) => ({
				url: `/api/book/updateFragment?bookId=${bookId}`,
				method: 'PATCH',
				body: newData,
				params: {
					...newData
				}
			}),
			invalidatesTags: ['add_book']
		}),
		UpDatePdf: build.mutation({
			query: ({ pdfFile, id }) => (
				console.log(pdfFile, 'sdfsdfsdfsdf'),
				{
					url: '/api/book/updatePdf',
					method: 'PATCH',
					params: {
						bookId: id,
						pdfUrl: pdfFile
					}
				}
			),
			invalidatesTags: ['add_book']
		})
	})
});

export const {
	useAddBookVendorMutation,
	usePostFileMutation,
	useEditBookMutation,
	useEditPhotoUrlMutation,
	useUpDateAudioFileMutation,
	useUpDateFragmentAudioFileMutation,
	useUpDatePdfMutation
} = api;
