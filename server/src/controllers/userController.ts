import { RequestHandler, Request, Response, NextFunction } from 'express';
import { comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { User } from '../models/User.model';
import {
  IUserLoginResponse,
  IUserRegisterResponse,
} from '../interfaces/IResponse';
import {
  IUserLoginRequest,
  IUserRegisterRequest,
} from '../interfaces/IRequest';
import { IUser } from '../interfaces/IUser';

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      address,
      postalCode,
      phoneNumber,
      email,
      password,
      confirmPassword,
      role,
    } = req.body as IUserRegisterRequest;

    const findUser: IUser | null = await User.findOne({
      email,
    });

    if (findUser) {
      throw { name: 'BadRequest', message: 'User already exists' };
    }

    if (password !== confirmPassword) {
      throw { name: 'BadRequest', message: 'Passwords do not match' };
    }

    const user: IUser | null = await User.create({
      firstName,
      lastName,
      address,
      postalCode,
      phoneNumber,
      email,
      password,
      role,
    });

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
    } as IUserRegisterResponse);
  } catch (err: any) {
    next(err);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as IUserLoginRequest;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      throw { name: 'BadRequest', message: 'Invalid credentials' };
    }

    const isPasswordMatch: boolean = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw { name: 'BadRequest', message: 'Invalid credentials' };
    }

    const token: string = generateToken({ userId: user._id.toString() });

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
    } as IUserLoginResponse);
  } catch (err: any) {
    next(err);
  }
};
