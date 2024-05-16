/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GETBOOKBYID {
	type GetBookByIdResponse = {
		id?: number;
		image: string;
		bookType: string;
		title: string;
		authorsFullName: string;
		genre: string;
		publishingHouse: string;
		description: string;
		fragment: string;
		language: string;
		publishedYear: number;
		volume: number;
		discount: number;
		price: number;
		fragmentAudUrl: string;
		duration: string;
		statusBook: string;
	}[];
	type GetBookByIdRequest = string;
	type PutBookByIdResponse = {
		id?: number;
		addToBasketBook: {
			image: string;
			bookType: string;
			title: string;
			authorsFullName: string;
			genre: string;
			publishingHouse: string;
			description: string;
			fragment: string;
			language: string;
			publishedYear: number;
			volume: number;
			discount: number;
			price: number;
			fragmentAudUrl: string;
			duration: string;
			statusBook: string;
		};
	}[];

	type PutBookByIdRequest = string;
}
