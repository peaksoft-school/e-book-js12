/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USERHISTORY {
	type UserHistoryResponse = {
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
	type UserHistoryRequest = UserHistory;
}
