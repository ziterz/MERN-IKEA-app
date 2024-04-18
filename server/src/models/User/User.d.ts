import { Document, Types } from 'mongoose';
import IUser from '../../../../client/src/interfaces/IUser';

export default interface UserDocument extends IUser, Document {
  _id: Types.ObjectId;
}
