import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string | 'user' | 'admin';
}
