import { IProduct } from './IProduct';

export interface ICart {
  user: string; // User._id
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
}
