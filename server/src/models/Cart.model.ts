import { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/ICart';

const CartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [
    {
      product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
});

export const Cart = model<ICart>('Cart', CartSchema);
