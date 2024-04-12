import { Document, Types } from 'mongoose';
import { IProduct } from './IProduct';
import { IUser } from './IUser';

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user: IUser;
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
