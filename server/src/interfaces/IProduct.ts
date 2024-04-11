import { Types } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: Types.ObjectId;
}
