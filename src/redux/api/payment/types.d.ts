/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PAYMENT {
	type CreatePaymentResponse = {
		httpStatus: string;
		message: string;
	};

	type CreatePaymentRequest = void;

	type ComformPaymentResponse = {
		httpStatus: string;
		message: string;
	};
	type ConfirmPaymentRequest = void;
}
