import { Document, Types } from 'mongoose';
import IOrder from '../../../../client/src/interfaces/IOrder';

export default interface OrderDocument extends IOrder, Document {
  _id: Types.ObjectId;
}
