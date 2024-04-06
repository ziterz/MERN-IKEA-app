import { Request, Response } from 'express';
import { User } from '../models/User.model';

export const register = async (req: Request, res: Response) => {
  try {
    let findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      throw { name: 'BadRequest', message: 'User already exists' };
    }

    const user = await User.create(req.body);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error: any) {
    console.log(error);
    if (error.name === 'BadRequest') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {};
