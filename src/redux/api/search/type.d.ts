/* eslint-disable @typescript-eslint/no-unused-vars */
namespace SEARCH {
	type SearchResponse = {
		id: number;
		imageUrl: string;
		bookType: string;
		title: string;
		authorsFullName: string;
		discount: number;
		price: number;
		priceWithDiscount: number;
		createdAt: string;
		message: string;
	}[];
	type SearchRequest = {
		searchTerm: string;
	};
}
