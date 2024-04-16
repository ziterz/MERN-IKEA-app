import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: [true, 'Name is a required field'] },
  description: {
    type: String,
    required: [true, 'Description is a required field'],
  },
  price: {
    type: Number,
    required: [true, 'Price is a required field'],
    min: 0,
    cast: 'Price must be an integer value',
  },
  stock: {
    type: Number,
    cast: 'Stock must be an integer value',
    required: [true, 'Stock is a required field'],
    min: 0,
  },
  images: {
    type: [String],
    minlength: 2,
    required: [true, 'Images is a required field'],
    // minimum 2 images
    validate: {
      validator: function (images: string[]) {
        return images.length >= 2;
      },
      message: (props) => `Images must have at least 2 values`,
    },
  },
  category: {
    type: Schema.Types.ObjectId,
    required: [true, 'Category is a required field'],
    ref: 'Category',
    validate: {
      validator: function (category: string) {
        const objIdRegex = /^[0-9a-fA-F]{24}$/;
        return objIdRegex.test(category);
      },
      message: 'Category must be a valid ObjectId',
    },
  },
});

export const Product = model<IProduct>('Product', ProductSchema);
