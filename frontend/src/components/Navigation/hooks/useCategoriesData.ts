import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../react-query/constants';
import CategoryService from '../../../services/CategoryService';
/**
 * This Hook is responsible for getting categories
 * from database
 */
export default function useCategoriesData() {
  // Get categories
  const {
    data: categories = [],
    isLoading,
    isSuccess,
  } = useQuery([queryKeys.categories], CategoryService.getAllCategories, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { categories, isLoading, isSuccess };
}
