import { Document } from 'mongoose';
import { IProduct } from './IProduct';
import { IUser } from './IUser';

export interface ICart extends Document {
  user: IUser;
  items: [
    {
      product: IProduct;
      quantity: number;
    }
  ];
}
