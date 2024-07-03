import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		GetFindAllBookVedor: build.query<
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
			query: (params) => ({
				url: '/api/book/getAllPopularAudBooks',
				method: 'GET',
				params: {
					...params
				}
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
		getByIdVendor: build.query<
			BOOK.getByIdVendorResponse,
			BOOK.getByIdVendorRequest
		>({
			query: (id) => ({
				url: `/api/book/getByBookId/${id}`,
				method: 'GET'
			}),
			providesTags: ['book']
		}),
		GetReceiptRequestedBooks: build.query<
			BOOK.GetAllBooksResponse,
			BOOK.GetAllBooksRequest
		>({
			query: () => ({
				url: '/api/book/requests/books/',
				method: 'GET'
			}),
			providesTags: ['book']
		}),
		GetCountBookIsGenre: build.query<
			BOOK.GetCountBookIsGenreResponse,
			BOOK.GetCountBookIsgenreRequest
		>({
			query: () => ({
				url: '/api/book/getCountBooksInGenresForAdmin',
				method: 'GET'
			}),
			providesTags: ['book']
		})
	})
});
export const {
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
	useGetFindAllBookVedorQuery,
	useGetByIdVendorQuery,
	useGetReceiptRequestedBooksQuery,
	useGetCountBookIsGenreQuery
} = api;
