/* eslint-disable @typescript-eslint/no-unused-vars */

namespace BOOK {
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
}
