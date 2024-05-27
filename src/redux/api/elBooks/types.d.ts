/* eslint-disable @typescript-eslint/no-unused-vars */

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
