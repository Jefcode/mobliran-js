import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Product } from '../../../shared/types';
import Products from '../components/Products/Products';
import { queryKeys } from '../react-query/constants';
import ProductService from '../services/ProductService';

const SearchScreen = () => {
  const params = useParams();
  const { keyword } = params;

  // Load Products with this keyword
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery([queryKeys.searchedProducts, keyword], () =>
    ProductService.getSearchedProducts(keyword ?? '')
  );

  return (
    <>
      {/* Search Keyword Container */}
      <div className='w-full h-72 flex items-center justify-center bg-stone-100 px-10'>
        {/* Search Keyword Text */}
        <div className='text-4xl text-center leading-relaxed text-stone-700 font-semibold max-w-2xl'>
          نتایج یافت شده برای: {keyword}
        </div>
      </div>

      {/* Found Products */}
      <section id='found-products' className='py-20'>
        {/* Container */}
        <div className='container mx-auto px-6'>
          <Products
            products={products}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </section>
    </>
  );
};

export default SearchScreen;
