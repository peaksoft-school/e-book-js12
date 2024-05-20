import { api as index } from '..';
import { ApiResponse } from './types'; 

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getPromo: build.query<ApiResponse, void>({
      query: () => ({
        url: '/api/promoCode/enterPromotionalCode',
        method: 'GET'
      }),
      providesTags: ['promo'],
    }),
  }),
});

export const { useGetPromoQuery } = api;