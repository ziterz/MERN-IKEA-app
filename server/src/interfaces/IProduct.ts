export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string; // Category._id
}
