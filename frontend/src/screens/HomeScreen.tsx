import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import Hero from '../components/Partials/Hero';
import { useProducts } from '../components/Products/hooks/useProducts';
import { queryKeys } from '../react-query/constants';
import CategoryService from '../services/CategoryService';
import Products from '../components/Products/Products';
import Meta from '../components/common/Meta';

const HomeScreen = () => {
  // Prefetch Categories
  const queryClient = useQueryClient();

  queryClient.prefetchQuery(
    [queryKeys.categories],
    CategoryService.getAllCategories
  );

  // Fetch products
  const {
    productsQuery: { data: products = [], isLoading },
  } = useProducts();

  return (
    <>
      <Meta />

      <Hero />

      {/* Recent Products */}
      <section id='products' className='mt-10 mb-14'>
        {/* Container */}
        <div className='container mx-auto'>
          {/* Section Title */}
          <div className='flex items-center justify-between px-6 mt-2 mb-10 space-s-2'>
            <h3 className='text-2xl font-bold'>جدیدترین محصولات</h3>
            <Link to='/shop' className='hidden btn sm:block'>
              رفتن به فروشگاه
            </Link>
          </div>

          {/* Products Flex Container */}
          <Products products={products} isLoading={isLoading} />

          {/* Go to SHop */}
          <div className='px-6 sm:hidden mt-10'>
            <Link to='/shop' className='block w-full text-center btn'>
              رفتن به فروشگاه
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
