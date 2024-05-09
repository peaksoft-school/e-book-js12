import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://13.60.43.123:8080',
	prepareHeaders: (headers) => {
		return headers;
	},
	credentials: 'include'
});
console.log(import.meta.env.VITE_PUBLIC_API_URL, 'sli');

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	return result;
};

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryExtended,
	refetchOnReconnect: true,
	refetchOnFocus: false,
	tagTypes: ['me', 'product', 'basket', 'favorite'],
	endpoints: () => ({})
});
