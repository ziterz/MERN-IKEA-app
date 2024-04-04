import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: { type: [String], required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
});

export const Product = model<IProduct>('Product', ProductSchema);
