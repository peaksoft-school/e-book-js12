/* eslint-disable @typescript-eslint/no-unused-vars */
interface Results {
	id: number;
	title: string;
	photo: string;
	price: number;
	quantity: number;
	isBasket: boolean;
	isFavorite: boolean;
	vendor: Vendor;
	createdAt: string;
	updatedAt: string;
}

interface Vendor {
	name: string;
	login: string;
	photo: string;
}

namespace PRODUCT {
	type GetProductsResponse = {
		success: boolean;
		results: Results[];
	};
	type GetProductsRequest = void;

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
