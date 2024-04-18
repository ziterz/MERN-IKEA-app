import { Schema, model } from 'mongoose';
import CartDocument from './Cart';

const CartSchema = new Schema<CartDocument>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: { type: Number, required: true, min: 0 },
    },
  ],
});

const Cart = model<CartDocument>('Cart', CartSchema);
export default Cart;
