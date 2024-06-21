import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		CreatePayment: build.mutation<
			PAYMENT.CreatePaymentResponse,
			PAYMENT.CreatePaymentRequest
		>({
			query: ({ newData, token, test }) => (
				console.log(token),
				{
					url: `/api/stripe/create/payment?token=${'tok_createDispute'}&totalAmount=${test}`,
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
