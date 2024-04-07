import jwt from 'jsonwebtoken';

export const generateToken = ({ userId }: { userId: string }) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
