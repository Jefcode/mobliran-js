import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../react-query/constants';
import ProductService from '../../services/ProductService';
import Spinner from '../common/Spinner';
import ProductItem from './ProductItem';

interface RelatedProductsProps {
  id: string;
}

const RelatedProducts = ({ id }: RelatedProductsProps) => {
  const { data: products = [], isLoading } = useQuery(
    [queryKeys.relatedProducts, id],
    () => ProductService.getRelatedProducts(id)
  );

  return (
    <div className='py-20 bg-white'>
      <div className='container mx-auto'>
        {/* Title */}
        <p className='px-5 mb-10 text-lightGray'>محصولات مرتبط</p>

        {isLoading && (
          <div className='my-10'>
            <Spinner className='mx-auto w-20 h-20' />
          </div>
        )}

        {/* Products Flex Container */}
        <div className='flex flex-col items-start sm:flex-row sm:flex-wrap'>
          {products.slice(0, 4).map((product) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
