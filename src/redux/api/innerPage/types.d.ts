/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ALLBOOKS {
	type Result = {
		numberOfBooks: GetAllBooksResponse;
		books: GetAllBooksRequest[];
	};

	type GetAllBooksResponse = {
		totalNumberOfBooks: number;
		numberOfUnViewed: number;
		books: Book[];
	};

	type Book = {
		id: number;
		title: string;
		createdAt: string;
		price: number;
		imageUrl: string;
		isViewed: boolean;
	};

	type GetAllBooksRequest = void;
}
