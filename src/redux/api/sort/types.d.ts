/* eslint-disable @typescript-eslint/no-unused-vars */

export namespace SORT {
	type GetSortsResponse = {
		id: number;
		imageLink: string;
		bookName: string;
		publishedYear: number;
		price: number;
		quantityOfFavorite: number;
		quantityOfBasket: number;
		discount: number;
		priceWithDiscount: number;
	};
	type GetSortsRequest = void;

	type PostSortResponse = {
		totalNumberOfBooks: number;
		totalPages: number;
		books: TypeDataBook[];
	};
	type TypeDataBook = {
		inBasket: boolean;
		id: number;
		cover: string;
		title: string;
		authorFullName: string;
		price: number;
		discount: number;
		isAudioBook: boolean;
		inFavorites: boolean;
	};
	type PostSortRequest = {
		newData: dataFillters;
		pagination: pagination;
	};
	type pagination = {
		page: number;
		size: number;
	};
	type dataFillters = {
		genres: string[] | null;
		bookTypes: string[];
		languages: string[];
		price: Price;
		sort: string;
	};
	type Price = {
		from: number;
		to: number;
	};
}
