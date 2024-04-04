import { ICategory } from './ICategory';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: ICategory;
}
