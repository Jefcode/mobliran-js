import { useQuery } from '@tanstack/react-query';

import { useWishlistContext } from '../../../context/WishlistContext';
import { queryKeys } from '../../../react-query/constants';
import ProductService from '../../../services/ProductService';

/**
 * This Hook is responsible for getting wishlist ready
 */
export default function useWishlistData(keepPreviousData: boolean = true) {
  const { items } = useWishlistContext();

  const wishlistDataQuery = useQuery(
    [queryKeys.wishlist, items],
    () => ProductService.getWishlistProductsById(items),
    {
      refetchOnWindowFocus: false,
      keepPreviousData,
    }
  );

  return { wishlistDataQuery };
}
