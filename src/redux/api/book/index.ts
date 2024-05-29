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
				query: (id) => (
					console.log(id, 'idinner'),
					{
						url: `/api/book/${id}`,
						method: 'GET'
					}
				),
				providesTags: ['book']
			}
		),
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
		getEBook: build.query<BOOK.GetEBookResponse, BOOK.GetEBookRequest>({
			query: () => ({
				url: '/api/book/getAllElectronicBooks',
				method: 'GET'
			}),
			providesTags: ['book']
		}),
		getLastPublication: build.query<
			BOOK.GetLastPublicationResponse,
			BOOK.GetLastPublicationRequest
		>({
			query: () => ({
				url: '/api/book/getAllLastPublicationBooks',
				method: 'GET'
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
		})
	})
});
export const {
	useGetAllBookVedorQuery,
	useDeleteBookMutation,
	useGetBookByIdQuery,
	useGetAudioBookQuery,
	useGetEBookQuery,
	useGetLastPublicationQuery,
	useGetAllLatestBooksQuery
} = api;
