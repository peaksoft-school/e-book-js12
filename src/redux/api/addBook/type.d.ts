/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADDBOOKVENDOR {
	type AddBookVendorResponse = {
		data?: {
			httpStatus: string;
			message: string;
		};
		error: {
			data: {
				authorsFullName: string;
				publishedYear: string;
				price: string;
			};
			status: number;
		};
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

	type EditBookResponse = {
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

	type EditBookRequest = {
		newUpDateBook: dataBook;
		genre: string;
		language: string;
		bookType: string;
	};

	type PostFileResponse = {
		httpStatus: string;
		message: string;
	};

	type PostFileRequest = File;

	type UpdatePhotoResponse = {
		httpStatus: string;
		message: string;
		status: number;
		error: {
			data: {
				httpStatus: string;
				message: string;
			};
			status: number;
		};
	};
	type UpdatePhotoRequest = {
		newData: {
			oldUrl?: string;
			newUrl?: string;
		};
		bookId: number;
	};
}
