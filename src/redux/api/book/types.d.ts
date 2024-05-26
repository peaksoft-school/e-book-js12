/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PRODUCT {
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
		success: boolean;
		results: Results;
	};
	type DeleteProductRequest = number;
}
