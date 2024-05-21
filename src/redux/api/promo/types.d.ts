/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GETBOOKPROMO {
  type GetBookPromoResponse = {
    id?: number;
    image:string;
    title:string;
    authorsFullName: string;
    price: number;
    disCount: number;
    newPricePromoCodeBook: number;
  }[];
  type GetBookPromoResponse= number
}