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
					url: `/api/stripe/create/payment?token=${'tok_visa'}&totalAmount=${test}`,
					method: 'POST',
					body: newData
				}
			),
			invalidatesTags: ['payment']
		}),
		GetPaymentDetails: build.query<
			PAYMENT.GetPaymentDetailsResponse,
			PAYMENT.GetPaymentDetailsRequest
		>({
			query: (paymentId) => ({
				url: '/api/stripe/get/payment',
				method: 'GET',
				params: {
					paymentId
				}
			}),
			providesTags: ['payment']
		}),
		ConfirmPayment: build.mutation<
			PAYMENT.ConfirmPaymentResponse,
			PAYMENT.ConfirmPaymentRequest
		>({
			query: (paymentId) => ({
				url: `/api/stripe/confirm/payment`,
				method: 'POST',
				params: {
					paymentId: paymentId
				}
			}),
			invalidatesTags: ['payment']
		})
	})
});

export const {
	useCreatePaymentMutation,
	useConfirmPaymentMutation,
	useGetPaymentDetailsQuery
} = api;
