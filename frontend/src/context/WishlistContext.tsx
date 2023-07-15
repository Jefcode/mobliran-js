import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { createContext, ReactNode, useContext } from 'react';
import { useSelector } from 'react-redux';
import { User, WishListItem } from '../../../shared/types';
import { authSelector } from '../features/auth/authSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AuthService, {
  IAddToWishlist,
  IRemoveFromWishlist,
} from '../services/AuthService';

interface IWishlistContext {
  items: WishListItem[];
  addMutation: UseMutationResult<User, unknown, IAddToWishlist, unknown>;
  removeMutation: UseMutationResult<
    User,
    unknown,
    IRemoveFromWishlist,
    unknown
  >;
  addToWishlist: (id: string, onSuccess?: () => void) => void;
  removeFromWishlist: (id: string, onSuccess?: () => void) => void;
  setLocalWishlist: (newWishlist: WishListItem[]) => void;
}

interface WishlistContextProviderProps {
  children: ReactNode;
}

export const WishlistContext = createContext({} as IWishlistContext);

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};

export const WishlistContextProvider = ({
  children,
}: WishlistContextProviderProps) => {
  const [items, setItems] = useLocalStorage<WishListItem[]>('wishlist', []);
  const { user } = useSelector(authSelector);

  // Mutations
  const addMutation = useMutation(AuthService.addToWishlist);
  const removeMutation = useMutation(AuthService.removeFromWishlist);

  async function addToWishlist(id: string, onSuccess?: () => void) {
    // Check if User is logged in
    if (user.token) {
      const updatedUser = await addMutation.mutateAsync({
        token: user.token,
        id,
      });

      if (updatedUser) {
        setItems(updatedUser.wishlist || []);
        onSuccess?.();
      }
    } else {
      // Add To LocalStorage
      setItems((prevItems) => {
        const existingItem = prevItems.find((p) => p.product === id);

        if (!existingItem) {
          return [...prevItems, { product: id }];
        } else {
          return prevItems;
        }
      });

      onSuccess?.();
    }
  }

  async function removeFromWishlist(id: string, onSuccess?: () => void) {
    // Check if User is logged in
    if (user.token) {
      const updatedUser = await removeMutation.mutateAsync({
        token: user.token,
        id,
      });

      if (updatedUser) {
        setItems(updatedUser.wishlist || []);
        onSuccess?.();
      }
    } else {
      // Add To LocalStorage
      setItems((prevItems) => prevItems.filter((p) => p.product !== id));

      onSuccess?.();
    }
  }

  function setLocalWishlist(newWishlist: WishListItem[]) {
    setItems(newWishlist);
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addMutation,
        removeMutation,
        addToWishlist,
        setLocalWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
