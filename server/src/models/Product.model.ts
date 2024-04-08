import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  images: { type: [String], required: true },
  category: {
    type: String, // Category._id
    required: true,
    ref: 'Category',
  },
});

export const Product = model<IProduct>('Product', ProductSchema);
