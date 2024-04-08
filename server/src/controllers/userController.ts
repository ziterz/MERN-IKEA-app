import { Request, Response, NextFunction } from 'express';
import { comparePassword } from '../helpers/bcrypt';
import { generateToken } from '../helpers/jwt';
import { User } from '../models/User.model';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      throw { name: 'BadRequest', message: 'User already exists' };
    }

    if (req.body.password !== req.body.confirmPassword) {
      throw { name: 'BadRequest', message: 'Passwords do not match' };
    }

    const user = await User.create(req.body);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        postalCode: user.postalCode,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw { name: 'BadRequest', message: 'Invalid credentials' };
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw { name: 'BadRequest', message: 'Invalid credentials' };
    }

    const token = generateToken({ userId: user._id.toString() });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        postalCode: user.postalCode,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
