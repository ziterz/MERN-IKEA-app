import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: [true, 'Name is a required field'] },
  image: { type: String, required: [true, 'Image is a required field'] },
});

export const Category = model<ICategory>('Category', CategorySchema);
