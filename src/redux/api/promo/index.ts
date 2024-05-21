import { api as index } from '..';

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getPromo: build.query<
    GETBOOKPROMO.GetBookPromoResponse,
    GETBOOKPROMO.GetBookPromoResponse
    >({
      query: () => (
        console.log('promo'),
        {
        url: `/api/promoCode/enterPromotionalCode`,
        method: 'GET',
      }),
      providesTags: ['promo'],
    }),
  }),
});

export const { useGetPromoQuery } = api;