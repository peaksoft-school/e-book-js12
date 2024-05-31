namespace LATESTBOOKS {
	type GetAllBooksResponse = {
		id: number;
		imageUrl: string;
		title: string;
		price: number;
		authorsFullName: string;
		discount: number;
		price: number;
		priceWithDiscount: number;
	}[];
	type GetAllBooksRequest = void;
}
