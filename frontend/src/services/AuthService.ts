import { axiosInstance, getJWTHeader } from '../axiosInstance';
import { Address, CartItem, User, WishListItem } from '../../../shared/types';
import { IProfileUpdateForm } from '../screens/Account/AccountDetails';

export interface LoginUserData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterUserData extends LoginUserData {
  username: string;
}

interface Token {
  token: string;
}

export interface IUpdateUserAddress extends Token {
  address: Address;
}

export interface IUpdateUserProfile extends Token {
  userData: IProfileUpdateForm;
}

export interface IAddToCart extends Token {
  cartItem: CartItem;
}

export interface IRemoveFromCart extends Token {
  cartItemId: string;
}

export interface IUpdateCart extends Token {
  cart: CartItem[];
}

export interface IAddToWishlist extends Token {
  id: string;
}

export interface IRemoveFromWishlist extends Token {
  id: string;
}

export interface IUpdateWishlist extends Token {
  wishlist: WishListItem[];
}

class AuthService {
  // Login User Api request
  async loginUser(userData: LoginUserData): Promise<User> {
    const response = await axiosInstance.post('/users/login', userData);
    return response.data;
  }

  // Register User Api Request
  async registerUser(userData: RegisterUserData): Promise<User> {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  }

  // Get User Data
  async getUserData(token: string): Promise<User> {
    const response = await axiosInstance.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  // update User Address
  async updateUserAddress({
    token,
    address,
  }: IUpdateUserAddress): Promise<User> {
    const response = await axiosInstance.put(
      '/users/profile/address',
      address,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  // Update user Profile
  async updateUserProfile({ token, userData }: IUpdateUserProfile) {
    const response = await axiosInstance.put('/users/profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  // Add Product To Cart
  async addToCart({ token, cartItem }: IAddToCart): Promise<User> {
    const response = await axiosInstance.post(
      '/users/cart',
      cartItem,
      getJWTHeader(token)
    );
    return response.data;
  }

  // Remove from cart
  async removeFromCart({ token, cartItemId }: IRemoveFromCart): Promise<User> {
    const response = await axiosInstance.delete(
      `/users/cart/${cartItemId}`,
      getJWTHeader(token)
    );
    return response.data;
  }

  // Update the whole cart with new cart
  async updateCart({ token, cart }: IUpdateCart): Promise<User> {
    const response = await axiosInstance.put(
      '/users/cart',
      { cart },
      getJWTHeader(token)
    );
    return response.data;
  }

  async emptyCart(token: string): Promise<User> {
    const response = await axiosInstance.delete(
      '/users/cart',
      getJWTHeader(token)
    );
    return response.data;
  }

  /* ============== WISHLIST ================ */
  // Add Product To wishlist
  async addToWishlist({ token, id }: IAddToWishlist): Promise<User> {
    const response = await axiosInstance.post(
      '/users/wishlist',
      { product: id },
      getJWTHeader(token)
    );
    return response.data;
  }

  // Remove from cart
  async removeFromWishlist({ token, id }: IRemoveFromWishlist): Promise<User> {
    const response = await axiosInstance.delete(
      `/users/wishlist/${id}`,
      getJWTHeader(token)
    );
    return response.data;
  }

  // Update the whole wishlist with new wishlist
  async updateUserWishlist(
    wishlist: WishListItem[],
    token: string
  ): Promise<User> {
    const response = await axiosInstance.put('/users/wishlist', wishlist, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default new AuthService();
