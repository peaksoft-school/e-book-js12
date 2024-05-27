import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getPromo: build.query<PROMO.GetBookPromoResponse, PROMO.GetBookPromoRequest>({
			query: ({ promoCode }) => ({
				url: `/api/promoCode/enterPromotionalCode`,
				method: 'GET',
				params: { promoCode }
			}),
			providesTags: ['promo']
		})
	})
});

export const { useLazyGetPromoQuery } = api;