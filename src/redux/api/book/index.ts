import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllBookVedor: build.query<
			BOOK.GetProductsResponse,
			BOOK.GetProductsRequest
		>({
			query: ({ bookOperationType, page, pageSize }) => ({
				url: `/api/book/findVendorAllBooks`,
				method: 'GET',
				params: {
					bookOperationType,
					page,
					pageSize
				}
			}),
			providesTags: ['book']
		}),

		getAllVendorBooks: build.query<
			BOOK.GetAllVendorBooksResponse,
			BOOK.GetAllVendorBooksRequest
		>({
			query: ({ vendorId, operationType, page, pageSize }) => ({
				url: `/api/book/getAllVendorBooks/${vendorId}`,
				method: 'GET',
				params: {
					vendorId,
					operationType,
					page,
					pageSize
				}
			}),
			providesTags: ['book']
		}),

		deleteBook: build.mutation<
			BOOK.DeleteProductResponse,
			BOOK.DeleteProductRequest
		>({
			query: (id) => ({
				url: `/api/book/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['book']
		}),
		getBookById: build.query<BOOK.GetBookByIdResponse, BOOK.GetBookByIdRequest>(
			{
				query: (id) => ({
					url: `/api/book/${id}`,
					method: 'GET'
				}),
				providesTags: ['book']
			}
		),
		GetBookByIdVendor: build.query<
			BOOK.GetBookByIdVendorResponse,
			BOOK.GetBookByIdVendorRequest
		>({
			query: (id) => ({
				url: `/api/book/getByBookId/${id}`,
				method: 'GET'
			}),
			providesTags: ['book']
		}),
		getAudioBook: build.query<
			BOOK.GetAudioBookResponse,
			BOOK.GetAudioBookRequest
		>({
			query: () => ({
				url: '/api/book/getAllPopularAudBooks',
				method: 'GET'
			}),
			providesTags: ['book']
		}),
		getLastPublication: build.query<
			BOOK.GetLastPublicationResponse,
			BOOK.GetLastPublicationRequest
		>({
			query: ({ page, size, genre }) => ({
				url: '/api/book/getAllLastPublicationBooks',
				method: 'GET',
				params: { page, size, genre }
			}),
			providesTags: ['book']
		}),
		getAllLatestBooks: build.query<
			BOOK.GetAllLatestBooksResponse,
			BOOK.GetAllLatestBooksRequest
		>({
			query: () => ({
				url: '/api/book/getAllLastPublicationBooks',
				method: 'GET'
			}),
			providesTags: ['book']
		}),
		approveBook: build.mutation<
			BOOK.ApproveBookResponse,
			BOOK.ApproveBookRequest
		>({
			query: (id) => ({
				url: `/api/book/requests/approve/${id}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['book']
		}),
		rejectBook: build.mutation<
			BOOK.ApproveBookResponse,
			BOOK.RejectBookRequest
		>({
			query: ({ newData, id }) => ({
				url: `/api/book/requests/reject/${id}`,
				method: 'PATCH',
				params: {
					...newData
				}
			}),
			invalidatesTags: ['book']
		}),
		filterBooks: build.mutation<
			BOOK.FilterBooksAdminResponse,
			BOOK.FilterBooksAdminRequest
		>({
			query: (filters) => ({
				url: `/api/book/getAllBookFilter`,
				method: 'POST',
				body: filters
			}),
			invalidatesTags: ['book']
		}),
		EditPhotoUrl: build.mutation({
			query: ({ newData, bookId }) => {
				const formData = new FormData();
				formData.append('file', newData);
				return {
					url: `/api/book/updatePhoto?bookId=${bookId}`,
					method: 'PATCH',
					body: newData
				};
			},
			invalidatesTags: ['book']
		})
	})
});
export const {
	useGetAllBookVedorQuery,
	useGetAllVendorBooksQuery,
	useDeleteBookMutation,
	useGetBookByIdQuery,
	useGetAudioBookQuery,
	useGetLastPublicationQuery,
	useGetAllLatestBooksQuery,
	useApproveBookMutation,
	useRejectBookMutation,
	useFilterBooksMutation,
	useGetBookByIdVendorQuery,
	useEditPhotoUrlMutation
} = api;
