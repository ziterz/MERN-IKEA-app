import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: number;
  phoneNumber: string;
  email: string;
  password: string;
  role: string | 'user' | 'admin';
}
