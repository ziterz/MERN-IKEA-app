import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: number;
  email: string;
  password: string;
  phoneNumber: string;
}
