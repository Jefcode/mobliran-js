import { Product } from '../../../../shared/types';
import Message from '../common/Message';

import ProductItem from './ProductItem';
import SkeletonProducts from './SkeletonProducts';

interface ProductsProps {
  isLoading?: boolean;
  isError?: boolean;
  products: Product[];
}

const Products = ({
  products,
  isLoading = false,
  isError = false,
}: ProductsProps) => {
  return (
    <div className='flex flex-col items-start sm:flex-row sm:flex-wrap'>
      {isLoading && <SkeletonProducts />}
      {isError && (
        <div className='w-full px-6 mb-10'>
          <Message variant='danger'>خطایی رخ داده است</Message>
        </div>
      )}
      {products.length === 0 && !isLoading && (
        <div className='w-full px-6'>
          <Message variant='info'>هیچ محصولی یافت نشد</Message>
        </div>
      )}
      {products.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </div>
  );
};

export default Products;
