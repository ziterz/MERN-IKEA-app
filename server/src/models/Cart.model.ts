import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/ICart';

const CartSchema = new Schema<ICart>({
  user: {
    type: String, // User._id
    required: true,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: String, // Product._id
        required: true,
        ref: 'Product',
      },
      quantity: { type: Number, required: true, min: 0 },
    },
  ],
});

export const Cart = model<ICart>('Cart', CartSchema);
