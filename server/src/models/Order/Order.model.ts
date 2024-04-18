import { Schema, model } from 'mongoose';
import OrderDocument from './Order';

const OrderSchema = new Schema<OrderDocument>({
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

const Order = model<OrderDocument>('Order', OrderSchema);
export default Order;
