/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PROMO {
	export type GetBookPromoResponse = {
		page: number;
		size: number;
		allBooksByVendors: Book[];
	};

	export type Book = {
		id: number;
		images: string;
		title: string;
		authorsFullName: string;
		price: number;
		disCount: number;
		newPricePromoCodeBook: number;
	};

	export type GetBookPromoRequest = {
		promoCode: string;
	};

	export type CreatePromoCodeRequest = {
		promoCode: string;
		dateStart: string;
		dateEnd: string;
		disCount: number | string;
	};
	type CreatePromoCodeSuccessResponse = {
		data: {
			httpStatus: string;
			message: string;
		};
		error: {
			data?: {
				promoCode?: string;
				message?: string;
			};
			status: number;
		};
	};

	type CreatePromoCodeErrorResponse = {
		error: {
			data?: {
				promoCode?: string;
				message?: string;
			};
			status: number;
		};
	};
	type CreatePromoCodeResponse =
		| CreatePromoCodeSuccessResponse
		| CreatePromoCodeErrorResponse;
}
