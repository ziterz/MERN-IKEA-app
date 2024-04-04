import { IProduct } from './IProduct';
import { IUser } from './IUser';

export interface ICategory {
  user: IUser;
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
}
