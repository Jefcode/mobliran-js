import { Product } from '../../../../shared/types';
import { useWishlistContext } from '../../context/WishlistContext';
import Spinner from '../common/Spinner';
import WishlistItem from './WishlistItem';

interface WishlistDetailProps {
  products: Product[];
}

const WishlistDetail = ({ products }: WishlistDetailProps) => {
  const {
    removeFromWishlist,
    removeMutation: { isLoading: removeIsLoading },
  } = useWishlistContext();

  const isLoading = removeIsLoading;

  const removeItemHandler = (id: string) => {
    removeFromWishlist(id);
  };

  return (
    <div className='container mx-auto px-6 py-32 relative'>
      {isLoading && (
        <div className='absolute top-0 right-0 h-full w-full bg-white/75 z-50 flex items-center justify-center'>
          <Spinner className='w-20 h-20' />
        </div>
      )}

      {/* Items Table */}
      <table className='w-full'>
        <tbody>
          {products.map((product, idx) => (
            <WishlistItem
              onRemove={removeItemHandler}
              key={idx}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishlistDetail;
