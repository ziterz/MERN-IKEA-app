import { Schema, model } from 'mongoose';
import CategoryDocument from './Category';

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: [true, 'Name is a required field'] },
  image: { type: String, required: [true, 'Image is a required field'] },
});

const Category = model<CategoryDocument>('Category', CategorySchema);
export default Category;
