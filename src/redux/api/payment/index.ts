import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		CreatePayment: build.mutation({
			query: ({ newData, token, totalAmount }) => (
				console.log(token),
				{
					url: `/api/stripe/create/payment?token=${'tok_visa'}&totalAmount=${totalAmount}`,
					method: 'POST',
					body: newData
				}
			),
			invalidatesTags: ['payment']
		}),
		ConfirmPayment: build.mutation({
			query: (newData) => ({
				url: '/api/stripe/confirm/payment',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['payment']
		})
	})
});

export const { useCreatePaymentMutation, useConfirmPaymentMutation } = api;
