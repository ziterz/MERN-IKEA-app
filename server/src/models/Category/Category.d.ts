import { Document, Types } from 'mongoose';
import ICategory from '../../../../client/src/interfaces/ICategory';

export default interface CategoryDocument extends ICategory, Document {
  _id: Types.ObjectId;
}
