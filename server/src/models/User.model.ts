import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export const User = model<IUser>('User', UserSchema);
