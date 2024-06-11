/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace BESTSELLERS {
	type GetAllBestsellersResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: [];
	}[];
	type GetAllBestsellersRequest = void;
}

namespace EBOOK {
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
}
