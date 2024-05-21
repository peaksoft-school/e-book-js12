import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	}
});
const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	return result;
};
export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryExtended,
	refetchOnReconnect: true,
	refetchOnFocus: false,
	tagTypes: ['me', 'product', 'basket','book_info', 'add_to_basket', 'favorite', 'sort', 'add_to_favorite','promo'],
	endpoints: () => ({})
});
