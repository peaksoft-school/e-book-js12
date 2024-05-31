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
		books: books[];
	};

	type books = {
		id: number;
		title: string;
		createdAt: string;
		price: number;
		imageUrl1: string;
		isViewed: boolean;
		totalNumberOfBooks: number;
		numberOfUnViewed: number;
	};

	type GetAllBooksRequest = void;
}
