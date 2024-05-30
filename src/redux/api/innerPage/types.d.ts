/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ALLBOOKS {
	type Result = {
		numberOfBooks: GetAllBooksResponse;
		books: GetAllBooksRequest[];
	};

	type GetAllBooksResponse = {
		id: number;
		title: string;
		createdAt: string;
		price: number;
		imageUrl: string;
		isViewed: boolean;
		totalNumberOfBooks: number;
		numberOfUnViewed: number;
	}[];

	type GetAllBooksRequest = void;
}
