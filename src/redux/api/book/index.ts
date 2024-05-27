import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllBookVedor: build.query<
			PRODUCT.GetProductsResponse,
			PRODUCT.GetProductsRequest
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
		// postProduct: build.mutation<
		// 	PRODUCT.PostProductResponse,
		// 	PRODUCT.PostProductRequest
		// >({
		// 	query: () => ({
		// 		url: '/products/create',
		// 		method: 'POST'
		// 	}),
		// 	invalidatesTags: ['book']
		// }),

		deleteBook: build.mutation<
			PRODUCT.DeleteProductResponse,
			PRODUCT.DeleteProductRequest
		>({
			query: (id) => ({
				url: `/api/book/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['book']
		})
	})
});
export const { useGetAllBookVedorQuery, useDeleteBookMutation } = api;
