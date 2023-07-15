import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { useSelector } from 'react-redux';
import { CartItem, User } from '../../../shared/types';
import { authSelector } from '../features/auth/authSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { queryKeys } from '../react-query/constants';
import AuthService, {
  IAddToCart,
  IRemoveFromCart,
  IUpdateCart,
} from '../services/AuthService';

interface IShoppingCartContext {
  items: CartItem[];
  addMutation: UseMutationResult<User, unknown, IAddToCart, unknown>;
  removeMutation: UseMutationResult<User, unknown, IRemoveFromCart, unknown>;
  updateMutation: UseMutationResult<User, unknown, IUpdateCart, unknown>;
  emptyMutation: UseMutationResult<User, unknown, string, unknown>;
  addToCart: (item: CartItem, onSuccess?: () => void) => void;
  removeFromCart: (id: string, onSuccess?: () => void) => void;
  updateCart: (newCart: CartItem[], onSuccess?: () => void) => void;
  setLocalCart: (newCart: CartItem[]) => void;
  emptyCart: () => void;
  isInCart: (id: string) => boolean;
}

interface ShoppingCartContextProviderProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext({} as IShoppingCartContext);

export const ShoppingCartContextProvider = ({
  children,
}: ShoppingCartContextProviderProps) => {
  const queryClient = useQueryClient();

  // Data
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cartItems',
    []
  );
  const { user } = useSelector(authSelector);

  // Mutations
  const addToCartMutation = useMutation(AuthService.addToCart);
  const removeFromCartMutation = useMutation(AuthService.removeFromCart, {
    onError: (error) => {},
  });
  const updateCartMutation = useMutation(AuthService.updateCart);
  const emptyCartMutation = useMutation(AuthService.emptyCart);

  async function addToCart(cartItem: CartItem, onSuccess?: () => void) {
    // Check if User is logged in
    if (user.token) {
      const updatedUser = await addToCartMutation.mutateAsync({
        token: user.token,
        cartItem,
      });

      if (updatedUser) {
        setCartItems(updatedUser.cart || []);
        onSuccess?.();
      }
    } else {
      // Add To LocalStorage
      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find(
          (p) => p.product === cartItem.product
        );

        if (existingItem) {
          return prevCartItems.map((p) =>
            p.product === cartItem.product ? cartItem : p
          );
        } else {
          return [...prevCartItems, cartItem];
        }
      });

      onSuccess?.();
    }
  }

  async function removeFromCart(cartItemId: string, onSuccess?: () => void) {
    // Check if user is logged in
    if (user.token) {
      const updatedUser = await removeFromCartMutation.mutateAsync({
        token: user.token,
        cartItemId,
      });

      if (updatedUser) {
        // Invalidate Cart Query Key which is used to fetch cart products
        queryClient.invalidateQueries([queryKeys.cart]);

        setCartItems(updatedUser.cart || []);
        onSuccess?.();
      }
    } else {
      // remove from localstorage
      setCartItems((prevCartItems) => {
        return prevCartItems.filter((p) => p.product !== cartItemId);
      });

      onSuccess?.();
    }
  }

  async function updateCart(toUpdateData: CartItem[], onSuccess?: () => void) {
    // Prepare the new Cart
    const newCart: CartItem[] = [];

    cartItems.forEach((item) => {
      const existingItemIndex = toUpdateData.findIndex(
        (p) => p.product === item.product
      );
      const existingItem = toUpdateData[existingItemIndex];

      if (existingItem) {
        newCart.push(existingItem);
      } else {
        newCart.push(item);
      }
    });

    // Check if User is logged in => save new cart in database
    if (user.token) {
      const updatedUser = await updateCartMutation.mutateAsync({
        token: user.token,
        cart: newCart,
      });

      if (updatedUser) {
        setCartItems(updatedUser.cart || []);
        onSuccess?.();
      }
    } else {
      setCartItems(newCart || []);
      onSuccess?.();
    }
  }

  async function emptyCart(onSuccess?: () => void) {
    // Check user
    if (user.token) {
      const updatedUser = await emptyCartMutation.mutateAsync(user.token);

      if (updatedUser) {
        setCartItems(updatedUser.cart || []);
        onSuccess?.();
      }
    } else {
      setCartItems([] as CartItem[]);
      onSuccess?.();
    }
  }

  function setLocalCart(newCart: CartItem[]) {
    setCartItems(newCart);
  }

  // Check if product is in cart
  function isInCart(id: string): boolean {
    const item = cartItems.find((p) => p.product === id);
    return !!item;
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        items: cartItems,
        addMutation: addToCartMutation,
        removeMutation: removeFromCartMutation,
        updateMutation: updateCartMutation,
        emptyMutation: emptyCartMutation,
        addToCart,
        removeFromCart,
        updateCart,
        setLocalCart,
        emptyCart,
        isInCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};
