import { Schema, model } from 'mongoose';
import { hashPassword } from '../helpers/bcrypt';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  phoneNumber: { type: String, required: true },
});

UserSchema.pre<IUser>('save', async function (next) {
  this.role = 'user';
  this.password = await hashPassword(this.password);

  return next();
});

export const User = model<IUser>('User', UserSchema);
