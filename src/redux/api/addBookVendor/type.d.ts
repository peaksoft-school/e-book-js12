/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADDBOOKVENDOR {
	type AddBookVendorResponse = {
		multipartFiles: string[];
		title: string;
		authorsFullName: string;
		publishingHouse: string;
		description: string;
		fragment: string;
		publishedYear: number;
		volume: number;
		amountOfBook: number;
		discount: number;
		price: number;
		bestseller: boolean;
	};
	type AddBookVendorRequest = {
		multipartFiles: string[];
		title: string;
		authorsFullName: string;
		publishingHouse: string;
		description: string;
		fragment: string;
		publishedYear: number;
		volume: number;
		amountOfBook: number;
		discount: number;
		price: number;
		bestseller: boolean;
	};
}
