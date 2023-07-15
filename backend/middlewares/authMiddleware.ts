import { Request } from 'express';

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface DecodedInfo {
  id: string;
}

export const protect = asyncHandler(async (req: Request, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = await User.findById((decoded as DecodedInfo).id).select(
        '-password'
      );

      if (!req.user) {
        res.status(401);
        throw new Error('توکن اشتباه است');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('مجاز به انجام این عملیات نیستید، توکن اشتباه است');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('مجاز به انجام این عملیات نیستید، توکن شناسایی نشد');
  }
});
