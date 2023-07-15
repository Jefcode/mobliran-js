import { Order, Product, User } from '../../../shared/types';

export interface ResultCartItem {
  product: Product;
  quantity: number;
}

export interface ResultOrder extends Order {
  user: User;
  orderItems: ResultCartItem[];
}

export interface ResultWishListItem {
  product: Product;
}
