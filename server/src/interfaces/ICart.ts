import { Types } from 'mongoose';
import { IProduct } from './IProduct';

export interface ICart {
  user: Types.ObjectId;
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
}
