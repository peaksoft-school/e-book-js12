/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GETBOOKBYID {
	type PutBookByIdResponse = {
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

	type PutBookByIdRequest = number;

	type PostBookByIdResponse = {
		httpStatus: string;
		message: string;
	};

	type PostBookByIdRequest = number;
}
