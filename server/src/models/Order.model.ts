import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/IOrder';

const OrderSchema = new Schema<IOrder>({
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
  totalPrice: { type: Number, required: true, min: 0 },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const Order = model<IOrder>('Category', OrderSchema);
