import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const Category = model<ICategory>('Category', CategorySchema);
