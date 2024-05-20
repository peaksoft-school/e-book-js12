export interface Book {
  id: number;
  images: string[];
  title: string;
  authorsFullName: string;
  price: number;
  disCount: number;
  newPricePromoCodeBook: number;
}

export interface ApiResponse {
  page: number;
  size: number;
  allBooksByVendors:Book[];
}