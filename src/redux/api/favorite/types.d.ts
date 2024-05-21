/* eslint-disable @typescript-eslint/no-unused-vars */
interface Results {
	id: number;
	title: string;
	photo: string;
	price: number;
	quantity: number;
	isBasket: boolean;
	isFavorite: boolean;
	vendor: Vendor;
	createdAt: string;
	updatedAt: string;
}

interface Vendor {
	name: string;
	login: string;
	photo: string;
}

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
	}
	type GetCountOfBooksRequest = void;

	type ClearFavoriteResponse = {
		httpStatus: string;
		message: string;
	}[];
	type ClearFavoriteRequest = void;
}
