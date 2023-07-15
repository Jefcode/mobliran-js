import mongoose from 'mongoose';
import { ResultCartItem } from '../frontend/src/models/types';

export interface Id {
  _id: string;
}

export interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review extends Timestamps {
  name: string;
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
}

export interface Product {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId | string;
  title: string;
  price: number;
  intro: string;
  countInStock: number;
  categories: mongoose.Schema.Types.ObjectId[] | string[] | Category[];
  tags: string[];
  description: string;
  info: {
    weight: string;
    dimentions: string;
    colors: string;
    material: string;
  };
  reviews: Review[];
  rating: number;
  images: string[];
  numReviews: number;
}

export interface Address {
  country: string;
  city: string;
  address: string;
  postalCode: number;
}

export interface CartItem {
  product: mongoose.Schema.Types.ObjectId | string;
  quantity: number;
}

export interface WishListItem {
  product: mongoose.Schema.Types.ObjectId | string;
}

export interface User {
  email: string;
  password: string;
  username: string;
  address?: Address;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  token?: string;
  cart?: CartItem[];
  wishlist?: WishListItem[];
}

export interface Category {
  _id?: string;
  title: string;
}

export interface Order {
  _id?: string;
  user?: string | User;
  orderItems: CartItem[] | ResultCartItem[];
  shippingAddress: Address;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_adress: string;
  };
  shippingPrice: number;
  specialNotes?: string;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
