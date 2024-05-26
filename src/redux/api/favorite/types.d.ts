/* eslint-disable @typescript-eslint/no-unused-vars */
namespace FAVORITE {
	type GetAllBooksInFavoriteResponse = {
		image: string;
		title: string;
		authorFullName: string;
		description: string;
		id: number;
	}[];
	type GetAllBooksInFavoriteRequest = void;

	type GetCountOfBooksResponse = {
		count: string;
	};
	type GetCountOfBooksRequest = void;

	type ClearFavoriteResponse = {
		httpStatus: string;
		message: string;
	}[];
	type ClearFavoriteRequest = void;

	type DeleteFavoriteBookResponse = {
		httpStatus: string;
		message: string;
	};
	type DeleteFavoriteBookRequest = number;

	type AddBookToBasketResponse = {
		httpStatus: string;
		message: string;
	};
	type AddBookToBasketRequest = number;
}
