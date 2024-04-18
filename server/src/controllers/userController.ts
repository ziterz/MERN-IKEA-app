import { RequestHandler, Request, Response, NextFunction } from 'express';
import { comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import User from '../models/User/User.model';

/**
 * @route   POST api/auth/register
 * @desc    Register a new user
 * @access  Public
 */

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
    } = req.body;

    const findUser = await User.findOne({
      email,
    });

    if (findUser) {
      throw { name: 'BadRequest', message: 'User already exists' };
    }

    if (password !== confirmPassword) {
      throw { name: 'BadRequest', message: 'Passwords do not match' };
    }

    const user = await User.create({
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
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw { name: 'BadRequest', message: 'Invalid email or password' };
    }

    const isPasswordMatch: boolean = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw { name: 'BadRequest', message: 'Invalid email or password' };
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
    });
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route   POST api/auth/validate-token
 * @desc    Validate token
 * @access  Public
 */

export const validateToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      message: 'Token is valid',
    });
  } catch (err: any) {
    next(err);
  }
};
