import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// import type { Category, Product } from './../../../../../shared/types';
import { queryKeys } from '../../../react-query/constants';
import ProductService from '../../../services/ProductService';

export type SortOptions = 'default' | 'popularity' | 'new' | 'ASC' | 'DESC'; // Asc and Desc is for price

export type PriceRange = {
  min: number;
  max?: number;
};

export function useProducts(initCategory?: string | undefined) {
  const [category, setCategory] = useState(initCategory);
  const [sortBy, setSortBy] = useState<SortOptions>('default');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 1000 });

  const productsQuery = useQuery(
    [queryKeys.products, category, sortBy, priceRange],
    () =>
      ProductService.getProducts({
        category,
        sortBy,
        priceRange,
      })
  );

  return {
    productsQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
  };
}
