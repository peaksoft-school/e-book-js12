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

	export type UserHistoryRequest = number;
}

namespace USERALLHISTORY {
	export type UserHistoryActionResponse = {
		data: UserHistoryAction[];
	};

	export type UserHistoryAction = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		quantity: number;
		discount: number;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
	};

	export type UserHistoryActionRequest = number;
}

namespace USEFAVORITE {
	export type UserAllFavoriteResponse = {
		data: UseAllFavorite[];
	};

	export type UseAllFavorite = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		discount: number;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
	};

	export type UserAllFavoriteRequest = number;
}

namespace USEBASKET {
	export type UseBasketBooksResponse = {
		data: UseBooksBasket[];
	};

	export type UseBooksBasket = {
		id: number;
		title: string;
		authorsFullName: string;
		imageUrl: string;
		discount: number;
		price: number;
		priceWithDiscount: number;
		quantity: number;
	};

	export type UseBasketBooksRequest = number;
}
