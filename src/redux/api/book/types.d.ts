/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace BOOK {
	type GetProductsResponse = {
		bookResponses: BooksResponses[];
		totalBooks?: number;
	};

	type BooksResponses = {
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
		data: {
			httpStatus: string;
			message: string;
		};
		status: number;
		error: {
			status: number;
			data: {
				message: string;
			};
		};
	};
	type DeleteProductRequest = number;

	type GetBookByIdResponse = {
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
		duration: Duration;
		statusBook: string;
		bestseller: boolean;
		amountOfBook: number;
		inBasket: boolean;
	};
	type Duration = {
		seconds: number;
		zero: boolean;
		nano: number;
		negative: boolean;
		positive: boolean;
		units: Unit[];
	};

	type Unit = {
		durationEstimated: boolean;
		timeBased: boolean;
		dateBased: boolean;
	};

	type GetBookByIdRequest = number;

	type GetBookByIdVendorResponse = {
		bookId: number;
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
		priceWithDiscount: number;
		fragmentAudUrl: string;
		audBookUrl: string;
		fileForBook: string;
		duration: string;
		durationFragmentAud: string;
		durationAudFragment: number;
		statusBook: string;
		bestseller: boolean;
		countFavorite: number;
		amountOfBook: number;
		countBasket: number;
	};

	type GetBookByIdVendorRequest = number;

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
	type GetAudioBookRequest = {
		page: number;
		size: number;
	};

	type GetLastPublicationResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: string;
	}[];
	type GetLastPublicationRequest = {
		page: number;
		size: number;
		genre: string;
	};

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
		status: number;

		error: {
			data: {
				httpStatus: string;
				message: string;
			};
			status: number;
		};
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
		books: Books[]!;
	};
	type Books = {
		bookId: number;
		imageUrl: string;
		title: string;
		authorFullName: string;
		dataOfDate: string;
		price: number;
		discount: number;
	};

	type FilterBooksAdminRequest = {
		genres: string[];
		bookTypes: string[];
	};

	type getByIdVendorResponse = {
		bookId: number;
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
		priceWithDiscount: number;
		fragmentAudUrl: string;
		audBookUrl: string;
		fileForBook: string;
		duration: string;
		durationFragmentAud: string;
		durationAudFragment: number;
		statusBook: string;
		bestseller: boolean;
		amountOfBook: number;
		countFavorite: number;
		countBasket: number;
	};

	type getByIdVendorRequest = number;

	type GetAllBooksResponse = {
		totalNumberOfBooks: number;
		numberOfUnViewed: number;
		books: Book[];
	};

	type Book = {
		id: number;
		title: string;
		createdAt: string;
		price: number;
		imageUrl: string;
		isViewed: boolean;
	};

	type GetAllBooksRequest = void;

	type GetCountBookIsGenreResponse = {
		HOBBIES: number;
		COMMUNITY: number;
		BEAUTY_HEALTH_SPORT: number;
		BOOKS_FOR_CHILDREN: number;
		BUSINESS_LITERATURE: number;
		SCIENCE_AND_TECHNOLOGY: number;
		EDUCATION: number;
		PSYCHOLOGY: number;
		ARTISTIC_LITERATURE: number;
	};
	type GetCountBookIsgenreRequest = void;
}
