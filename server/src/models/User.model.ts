import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
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

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  return next();
});

export const User = model<IUser>('User', UserSchema);
