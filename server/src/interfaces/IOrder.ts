import { Types } from 'mongoose';
import { IProduct } from './IProduct';

export interface IOrder {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
  totalPrice: number;
  status: string;
  createdAt: Date;
}
