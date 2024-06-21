/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PAYMENT {
	type CreatePaymentResponse = {
		httpStatus: string;
		message: string;
	};

	type CreatePaymentRequest = {
		token: string;
		test: number;
		newData: any;
	};

	type ComformPaymentResponse = {
		httpStatus: string;
		message: string;
	};
	type ConfirmPaymentRequest = void;
}
