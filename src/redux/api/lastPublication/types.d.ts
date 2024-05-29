namespace LASTPUBLICATION {
	type GetLastPublicationResponse = {
		id: number;
		title: string;
		price: number;
		priceWithDiscount: number;
		description: string;
		imageUrl: string;
		bookType: string;
	}[];
	type GetLastPublicationRequest = {
		page: number;
		size: number;
		genre: string;
	};
}
