import { Document, Types } from 'mongoose';
import { IProduct } from './IProduct';
import { IUser } from './IUser';

export interface ICart extends Document {
  _id: Types.ObjectId;
  user: IUser;
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
}
