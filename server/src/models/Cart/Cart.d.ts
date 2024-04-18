import { Document, Types } from 'mongoose';
import ICart from '../../../../client/src/interfaces/ICart';

export default interface CartDocument extends ICart, Document {
  _id: Types.ObjectId;
}
