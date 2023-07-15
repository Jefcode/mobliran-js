import { Review, Product, User, Category, Order } from './../../shared/types';
import { Document } from 'mongoose';

interface CustomUserMethods {
  matchPassword: (password: string) => Promise<boolean>;
}

interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUser = User & CustomUserMethods & Document & Timestamps;
export type IReview = Review & Document & Timestamps;
export type IProduct = Product & Document & Timestamps;
export type ICategory = Category & Document & Timestamps;
export type IOrder = Order & Document & Timestamps;
