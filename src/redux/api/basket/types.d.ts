/* eslint-disable @typescript-eslint/no-unused-vars */
namespace BASKET {
	type GetProductsResponse = {
		totalNumberOfBooks: number;
		books: Book[];
	};
	type Book = {
		id: number;
		title: string;
		cover: string;
		authorsFullName: string;
		amount: number;
		discountFromPromoCode: number;
		bookDisCount: number;
		amountOfBook: number;
		price: number;
	};
	type GetProductsRequest = void;

	type AddBookToBasketResponse = {
		httpStatus: string;
		message: string;
	};

	type AddBookToBasketRequest = number;

	type TotalCostResponse = {
		numberOfBooks: number;
		disCount: number;
		totalAmount: number;
	};
	type TotalCostRequest = void;

	type DeleteClearPageResponse = {
		httpStatus: string;
		message: string;
	};
	type DeleteClearPageRequst = void;

	type DeleteBookIdResponse = {
		httpStatus: string;
		message: string;
	};
	type DeleteBookIdRequst = number;

	type CountBookBasketResponse = {
		httpStatus: string;
		message: string;
		error: {
			status: number;
			data: {
				httpStatus: string;
				message: string;
			};
		};
	};
	type CountBookBasketRequest = {
		bookId: number;
		addOrMinus: boolean;
	};

	type ActivedPromoResponse = {
		data: {
			numberOfBooks: number;
			price: number;
			numberOfBooksDisCount: number;
			disCount: number;
			bookDiscount: number;
			totalAmount: number;
			bookId: number;
			getPromoCode: string;
		};
		status: number;
		error: {
			status: number;
			data: {
				message: string;
			};
		};
	};

	type ActivePromoRequest = {
		promoCode: string;
		id: number;
	};
}
