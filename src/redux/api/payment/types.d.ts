/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PAYMENT {
	type CreatePaymentResponse = {
		httpStatus: string;
		message: string;
	};

	type CreatePaymentRequest = {
		token: string;
		test: number;
		newData: Record<string, string>;
	};

	type ComformPaymentResponse = {
		httpStatus: string;
		message: string;
	};
	type ConfirmPaymentRequest = string | null
}
