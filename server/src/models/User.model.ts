import { Schema, model } from 'mongoose';
import { hashPassword } from '../utils/bcrypt';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'First Name is a required field'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is a required field'],
  },
  address: { type: String, required: [true, 'Address is a required field'] },
  postalCode: {
    type: String,
    required: [true, 'Postal Code is a required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email: string) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
    minlength: [5, 'Password must be at least 5 characters'],
  },
  role: { type: String, required: true, default: 'user' },
  phoneNumber: {
    type: String,
    required: [true, 'Phone Number is required field'],
    validate: {
      validator: function (phoneNumber: string) {
        const phoneRegex = /^[0-9]+$/;
        return phoneRegex.test(phoneNumber);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

UserSchema.pre<IUser>('save', async function (next) {
  this.password = await hashPassword(this.password);

  return next();
});

export const User = model<IUser>('User', UserSchema);
