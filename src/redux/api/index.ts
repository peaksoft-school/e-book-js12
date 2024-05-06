import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `https://api.elchocrud.pro/api/v1/86162171e5f689755dc22ef1fec32e39/newFavoriteapi`,
	prepareHeaders: (headers) => {
		return headers;
	},
	credentials: 'include'
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
	tagTypes: ['me', 'product', 'basket', 'favorite'],
	endpoints: () => ({})
});
