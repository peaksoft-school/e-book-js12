/* eslint-disable @typescript-eslint/no-unused-vars */


namespace SORT {
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
		success: boolean;
		results: Results;
	};
	type PostSortRequest = {
		title: string;
		photo: string;
		price: number;
		quantity: number;
	};


}
