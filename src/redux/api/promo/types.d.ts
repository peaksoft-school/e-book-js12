/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PROMO {
  type Book = {
    id: number;
    images: string[];
    title: string;
    authorsFullName: string;
    price: number;
    disCount: number;
    newPricePromoCodeBook: number;
  };

  type GetBookPromoResponse = {
    page: number;
    size: number;
    allBooksByVendors: Book[];
  };
}
