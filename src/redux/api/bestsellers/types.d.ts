namespace BESTSELLERS {
	type GetAllBestsellersResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: [];
	}[];
	type GetAllBestsellersRequest = void;
}
