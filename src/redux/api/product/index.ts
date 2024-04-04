import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<
			PRODUCT.GetProductsResponse,
			PRODUCT.GetProductsRequest
		>({
			query: () => ({
				url: '/products/get',
				method: 'GET'
			}),
			providesTags: ['product']
		}),

		postProduct: build.mutation<
			PRODUCT.PostProductResponse,
			PRODUCT.PostProductRequest
		>({
			query: (newData) => ({
				url: '/products/create',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['product']
		}),

		deleteProduct: build.mutation<
			PRODUCT.DeleteProductResponse,
			PRODUCT.DeleteProductRequest
		>({
			query: (id) => ({
				url: `/products/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['product']
		})
	})
});
export const {
	useGetProductsQuery,
	usePostProductMutation,
	useDeleteProductMutation
} = api;
