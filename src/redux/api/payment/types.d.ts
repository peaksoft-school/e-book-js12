/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PAYMENT {
	type CreatePaymentResponse = {
		data: {
			httpStatus: string;
			message: string;
		};
		status: number;
		error: {
			status: number;
			data: {
				message: string;
			};
		};
	};

	type CreatePaymentRequest = {
		token: string;
		test: number;
		newData: Record<string, string>;
	};

	type ConfirmPaymentResponse = {
		data?: {
			httpStatus: string;
			message: string;
		};
		status: number;
		error?: {
			status: number;
			data: {
				httpStatus: string;
				message: string;
			};
		};
	};
	type ConfirmPaymentRequest = string | null;

	type GetPaymentHistoryAction = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		quantity: number;
		discount: number;
		discountFromPromoCode: number;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
	};
	type GetPaymentDetailsResponse = {
		totalAmount: number;
		name: string;
		email: string;
		historyActions: GetPaymentHistoryAction[];
	};
	type GetPaymentDetailsRequest = string | null;
}
