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
		books: TypeDataBook[]
	};
	type TypeDataBook = {
		id: number;
		cover: string;
		title: string;
		authorFullName: string;
		price: number;
		discount: number;
		isAudioBook: boolean;
		inFavorites: boolean;
	}
	type PostSortRequest = {
		genres: string[];
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
