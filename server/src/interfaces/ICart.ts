import { Types } from 'mongoose';
import { IProduct } from './IProduct';

export interface ICart {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
}
