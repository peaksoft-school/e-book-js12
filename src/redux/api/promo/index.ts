import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getPromo: build.query<PROMO.GetBookPromoResponse, { promoCode: string }>({
      query: ({ promoCode }) => ({
        url: `/api/promoCode/enterPromotionalCode?promoCode=${promoCode}`,
        method: 'GET',
      }),
      providesTags: ['promo'],
    }),
  }),
});

export const { useGetPromoQuery } = api;
