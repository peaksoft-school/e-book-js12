/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace BOOK {
	type GetProductsResponse = {
		id: number;
		imageLink: string;
		bookName: string;
		publishedYear: number;
		price: number;
		quantityOfFavorite: number;
		quantityOfBasket: number;
		discount: number;
		priceWithDiscount: number;
	}[];
	type GetProductsRequest = {
		bookOperationType: string;
		page: number;
		pageSize: number;
	};

	type GetAllVendorBooksResponse = {
		id: number;
		imageLink: string;
		bookName: string;
		publishedYear: number;
		price: number;
		quantityOfFavorite: number;
		quantityOfBasket: number;
		discount: number;
		priceWithDiscount: number;
	}[];
	type GetAllVendorBooksRequest = {
		vendorId: number | null;
		operationType: string;
		page: number;
		pageSize: number;
	};

	type PostProductResponse = {
		success: boolean;
		results: Results;
	};
	type PostProductRequest = {
		title: string;
		photo: string;
		price: number;
		quantity: number;
	};

	type DeleteProductResponse = {
		httpStatus: string;
		message: string;
	};
	type DeleteProductRequest = number;

	type GetBookByIdResponse = {
		id?: number;
		imageUrlFirst: string;
		imageUrlLast: string;
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

	type GetBookByIdRequest = number;

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

	type PostBookByIdRequest = number;

	type GetAudioBookResponse = {
		id: number;
		imageUrl: string;
		title: string;
		price: number;
		priceWithDiscount: number;
		authFullName: string;
		duration: string;
		anew: boolean;
	}[];
	type GetAudioBookRequest = void;

	type GetEBookResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: string;
	}[];
	type GetEBookRequest = void;

	type GetLastPublicationResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: string;
	}[];
	type GetLastPublicationRequest = void;

	type GetAllLatestBooksResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: string;
	}[];
	type GetAllLatestBooksRequest = void;

	type ApproveBookResponse = {
		httpStatus: string;
		message: string;
	};

	type RejectBookRequest = {
		newData: {
			rejectReason: string;
		};
		id: number;
	};

	type ApproveBookRequest = number;

	type FilterBooksAdminResponse = {
		totalNumberOfBooks: number;
		totalPages: number;
		books: any[];
	};

	type FilterBooksAdminRequest = {
		genres: string[];
		bookTypes: string[];
	};
}
