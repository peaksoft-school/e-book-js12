/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USERHISTORY {
	export type UserHistoryResponse = {
		data: UserHistory[];
	};

	export type UserHistory = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		quantity: number;
		discount: number;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
		historyStatus: string;
	};

	export type UserHistoryRequest = void;
}

namespace USERALLHISTORY {
	export type UserHistoryActionResponse = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		quantity: number;
		discount: number;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
		historyStatus: string;
	}[];

	export type UserHistoryActionRequest = number;
}

namespace USEFAVORITE {
	export type UserAllFavoriteResponse = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		quantity: number;
		discount: number;
		discountFromPromoCode: number;
		historyStatus: string;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
		urlFile: string;
		bookType: string;
	}[];

	export type UserAllFavoriteRequest = number;
}

namespace USEBASKET {
	export type UseBasketBooksResponse = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		discount: number;
		price: number;
		priceWithDiscount: number;
		quantity: number;
		createdAt: string;
	}[];

	export type UseBasketBooksRequest = number;
}
