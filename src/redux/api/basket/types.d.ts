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

	type PostProductResponse = {
		success: boolean;
		results: Results;
	};
	type PostProductRequest = number;
}
