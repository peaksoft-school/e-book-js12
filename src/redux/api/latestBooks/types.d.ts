namespace LATESTBOOKS {
    type GetAllLatestBooksResponse = {
        id: number;
        title: string;
        price: number;
        priceWithDiscount: number;
        description: string;
        imageUrl: string;
        bookType: string;
    }[];
    type GetAllLatestBooksRequest = void;
}