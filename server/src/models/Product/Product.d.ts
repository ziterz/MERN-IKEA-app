import { Document, Types } from 'mongoose';
import IProduct from '../../../../client/src/interfaces/IProduct';

export default interface ProductDocument extends IProduct, Document {
  _id: Types.ObjectId;
}
