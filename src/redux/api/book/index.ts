import { api as index } from '..';

// interface TypeTest {
// 	bookOperationType: string;
// 	page: number;
// 	pageSize: number;
// }

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllBookVedor: build.query<
			PRODUCT.GetProductsResponse,
			PRODUCT.GetProductsRequest
		>({
			query: ({ bookOperationType = 'ALL', page = 1, pageSize = 12 }) => ({
				url: `/api/book/findVendorAllBooks`,
				method: 'GET',
				params: {
					bookOperationType,
					page,
					pageSize
				}
			}),
			providesTags: ['book']
		})
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

		// deleteProduct: build.mutation<
		// 	PRODUCT.DeleteProductResponse,
		// 	PRODUCT.DeleteProductRequest
		// >({
		// 	query: () => ({
		// 		url: `/products/delete/${''}`,
		// 		method: 'DELETE'
		// 	}),
		// 	invalidatesTags: ['book']
		// })
	})
});
export const {
	useGetAllBookVedorQuery
	// usePostProductMutation,
	// useDeleteProductMutation
} = api;
