import { Document } from 'mongoose';
import { ICategory } from './ICategory';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: ICategory;
}
