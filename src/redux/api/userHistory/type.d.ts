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
