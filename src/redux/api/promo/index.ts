import { api as baseApi } from '..';

const api = baseApi.injectEndpoints({
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
		postPromoCode: build.mutation<
			PROMO.CreatePromoCodeResponse,
			PROMO.CreatePromoCodeRequest
		>({
			query: (newData) => ({
				url: '/api/promoCode/creatingPromotionalCode',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['promo']
		})
	})
});

export const { useLazyGetPromoQuery, usePostPromoCodeMutation } = api;
