import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getPromo: build.query<
			PROMO.GetBookPromoResponse,
			PROMO.GetBookPromoRequest
		>({
			query: ({ promoCode }) => ({
				url: `/api/promoCode/enterPromotionalCode`,
				method: 'GET',
				params: { promoCode }
			}),
			providesTags: ['promo']
		}),
		postPromoCode: build.mutation({
			query: (newData) => ({
				url: '/api/promoCode/creatingPromotionalCode',
				method: 'POST',
				body: newData
			})
		})
	})
});

export const { useLazyGetPromoQuery, usePostPromoCodeMutation } = api;