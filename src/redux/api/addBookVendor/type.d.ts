/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADDBOOKVENDOR {
	type AddBookVendorResponse = {
		httpStatus: string;
		message: string;
	};
	type AddBookVendorRequest = {
		newUpDateBook: dataBook;
		genre: string;
		language: string;
		bookType: string;
	};
	type dataBook = {
		imageUrls: string[];
		fragmentAudUrl: string;
		fullAudUrl: string;
		pdfUrl: string;
		duration: number;
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

	type PostFileResponse = {
		httpStatus: string;
		message: string;
	};

	type PostFileRequest = File;
}
