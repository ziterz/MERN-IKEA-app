import { Document, Types } from 'mongoose';
import { ICategory } from './ICategory';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: ICategory;
}
